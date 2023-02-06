import prisma from "../prisma";

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
					steamId: true,
				},
			},
			Minecraft: {
				select: {
					minecraftId: true,
				},
			},
		},
	});

	return {
		steam: user?.Steam?.steamId,
		minecraft: user?.Minecraft?.minecraftId,
	};
}

export async function connectMinecraftToUser(
	mcInfo: { uuid: string; name: string },
	userID: string
) {
	const minecraft = await prisma.minecraft.create({
		data: {
			minecraftId: mcInfo.uuid,
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
	const steam = await prisma.steam.create({
		data: {
			steamId: steamID,
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

export async function disconnectWalletFromUser(userID: string) {
	const wallet = await prisma.wallet.delete({
		where: {
			userId: userID,
		},
	});
	return wallet;
}
