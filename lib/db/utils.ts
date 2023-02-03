import prisma from "../prisma";

export async function getUserByID(id: string) {
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
	});
	return user;
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
