import { connectSteamToUser, getUserByID } from "@/lib/db/utils";
import getHandler from "@/lib/oauth/router";
import { getSteamIDFromURL } from "@/lib/utils";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

const path = "api/auth/steam/return";

interface AuthReturnResponse extends Response {
	redirect: (path: string) => any;
	end: () => any;
}

export default getHandler().get(
	path,
	async (req: any, res: AuthReturnResponse) => {
		let idLink = req.query["openid.claimed_id"];
		if (!idLink) {
			res.redirect("/");
		}
		const steamID = getSteamIDFromURL(idLink);

		const session = await getSession({ req });
		if (!session?.user.id) {
			res.redirect("/");
		}

		const dbUser = await getUserByID(session?.user.id || "");
		if (!dbUser) {
			res.redirect("/");
		}

		let steam = connectSteamToUser(steamID, dbUser?.id || "");

		res.redirect("/?success=1");
	}
);
