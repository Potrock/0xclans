import {
	approveLink,
	connectSteamToUser,
	getLinkApprovalSig,
	getUserByID,
} from "@/lib/db/utils";
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
			res.redirect("/dashboard?error=steam");
			return;
		}
		const steamID = getSteamIDFromURL(idLink);

		const session = await getSession({ req });
		if (!session?.user.id) {
			res.redirect("/dashboard?error=session");
			return;
		}

		const dbUser = await getUserByID(session?.user.id || "");
		if (!dbUser) {
			res.redirect("/dashboard?error=db");
			return;
		}

		let steam = await connectSteamToUser(steamID, dbUser?.id || "");

		if (steam) {
			const approvalSig = await approveLink(
				steam.userId,
				steam.id,
				"steam"
			);
			if (approvalSig) {
				res.redirect(
					`/dashboard?link=true&platform=steam&id=${steam.id}&sig=${approvalSig}`
				);
				return;
			} else {
				res.redirect("/dashboard?error=sig");
				return;
			}
		}

		res.redirect("/dashbaord?error=link");
	}
);
