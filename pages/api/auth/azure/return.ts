import passport from "../../../../lib/passport";
import getHandler from "../../../../lib/router";
import { getSession } from "next-auth/react";
import { connectMinecraftToUser, getUserByID } from "@/lib/db/utils";

const path = "/api/auth/azure/return";

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
			res.redirect("/");
		}
		const mcInfo = req.user as { uuid: string; name: string };
		const dbUser = await getUserByID(session?.user.id || "");
		if (!dbUser) {
			res.redirect("/");
		}
		let minecraft = connectMinecraftToUser(mcInfo, dbUser?.id || "");

		res.redirect("/");
	});
