import prisma from "../prisma";
import { authorizeLink } from "../utils";

export async function getUserByID(id: string) {
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
	});
	return user;
}

export async function getUserLinkedAccounts(userId: string) {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			Steam: {
				select: {
					id: true,
				},
			},
			Minecraft: {
				select: {
					id: true,
				},
			},
		},
	});

	return {
		steam: user?.Steam?.id || null,
		minecraft: user?.Minecraft?.id || null,
	};
}

export async function connectMinecraftToUser(
	mcInfo: { uuid: string; name: string },
	userID: string
) {
	// If the user already has a linked minecraft account, delete it
	const existingMinecraft = await prisma.minecraft.findUnique({
		where: {
			userId: userID,
		},
	});
	if (existingMinecraft) {
		await disconnectMinecraftFromUser(userID);
	}

	const minecraft = await prisma.minecraft.create({
		data: {
			id: mcInfo.uuid,
			user: {
				connect: {
					id: userID,
				},
			},
		},
	});
	return minecraft;
}

export async function disconnectMinecraftFromUser(userID: string) {
	const minecraft = await prisma.minecraft.delete({
		where: {
			userId: userID,
		},
	});
	return minecraft;
}

export async function connectSteamToUser(steamID: string, userId: string) {
	// If the user already has a linked steam account, delete it
	const existingSteam = await prisma.steam.findUnique({
		where: {
			userId: userId,
		},
	});
	if (existingSteam) {
		await disconnectSteamFromUser(userId);
	}

	const steam = await prisma.steam.create({
		data: {
			id: steamID,
			user: {
				connect: {
					id: userId,
				},
			},
		},
	});
	return steam;
}

export async function disconnectSteamFromUser(userID: string) {
	const steam = await prisma.steam.delete({
		where: {
			userId: userID,
		},
	});
	return steam;
}

export async function connectWalletToUser(address: string, userId: string) {
	const wallet = await prisma.wallet.create({
		data: {
			address: address,
			user: {
				connect: {
					id: userId,
				},
			},
		},
	});
	return wallet;
}

export async function getUserLinkedWallet(userID: string) {
	const wallet =
		(await prisma.wallet.findUnique({
			where: {
				userId: userID,
			},
			select: {
				address: true,
			},
		})) ?? null;
	return wallet;
}

export async function disconnectWalletFromUser(userID: string) {
	const wallet = await prisma.wallet.delete({
		where: {
			userId: userID,
		},
	});
	return wallet;
}

export async function approveLink(
	userId: string,
	platformId: string,
	platformName: string
) {
	const wallet =
		(await prisma.wallet.findUnique({
			where: {
				userId: userId,
			},
			select: {
				address: true,
			},
		})) ?? null;
	if (wallet && wallet.address) {
		console.log(wallet.address);
		const sig = authorizeLink(
			wallet.address.toLowerCase(),
			platformId.toLowerCase(),
			platformName.toLowerCase()
		);

		if (sig) {
			return sig;
		}
	} else {
		return null;
	}
}

export async function getLinkApprovalSig(userID: string, platformName: string) {
	let platformUUID = null;

	if (platformName === "Minecraft") {
		platformUUID =
			(await prisma.minecraft.findUnique({
				where: {
					userId: userID,
				},
				select: {
					id: true,
				},
			})) ?? {};
	} else if (platformName === "Steam") {
		platformUUID =
			(await prisma.steam.findUnique({
				where: {
					userId: userID,
				},
				select: {
					id: true,
				},
			})) ?? {};
	} else {
		return null;
	}

	const wallet =
		(await prisma.wallet.findUnique({
			where: {
				userId: userID,
			},
			select: {
				address: true,
			},
		})) ?? null;
	if (wallet && wallet.address && platformUUID.id) {
		console.log(wallet.address);
		const sig = authorizeLink(
			wallet.address.toLowerCase(),
			platformUUID.id.toLowerCase(),
			platformName.toLowerCase()
		);

		if (sig) {
			return sig;
		}
	} else {
		return null;
	}
}
