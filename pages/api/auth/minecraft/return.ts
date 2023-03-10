import passport from "../../../../lib/oauth/passport";
import getHandler from "../../../../lib/oauth/router";
import { getSession } from "next-auth/react";
import {
	approveLink,
	connectMinecraftToUser,
	getLinkApprovalSig,
	getUserByID,
} from "@/lib/db/utils";

const path = "/api/auth/minecraft/return";

interface AuthReturnResponse extends Response {
	redirect: (path: string) => any;
	end: () => any;
}

export default getHandler()
	.use(
		passport.authenticate("azuread-openidconnect", {
			session: false,
			failureRedirect: "/",
		})
	)
	.get(path, async (req: any, res: AuthReturnResponse) => {
		const session = await getSession({ req });
		if (!session?.user.id) {
			res.redirect("/dashboard?error=session");
			return;
		}
		const mcInfo = req.user as { uuid: string; name: string };
		const dbUser = await getUserByID(session?.user.id || "");
		if (!dbUser) {
			res.redirect("/dashboard?error=db");
			return;
		}
		let minecraft = await connectMinecraftToUser(mcInfo, dbUser?.id || "");

		if (minecraft) {
			const approvalSig = await approveLink(
				minecraft.userId,
				minecraft.id,
				"minecraft"
			);
			if (approvalSig) {
				res.redirect(
					`/dashboard?link=true&platform=minecraft&id=${minecraft.id}&sig=${approvalSig}`
				);
				return;
			} else {
				res.redirect("/dashboard?error=sig");
				return;
			}
		}

		res.redirect("/dashboard?error=link");
	});
