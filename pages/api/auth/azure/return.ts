import { sessionOptions } from "@/lib/sessionOptions";
import { ironSession } from "iron-session/express";
import passport from "../../../../lib/passport";
import getHandler from "../../../../lib/router";

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
	.use(ironSession(sessionOptions))
	.get(path, async (req: any, res: AuthReturnResponse) => {
		const user = req.user;
		if (!user.accessToken) {
			res.redirect("/");
		}

		console.log(user.accessToken);

		req.session.msftAccessToken = user.accessToken;
		await req.session.save();
		res.redirect("/");
	});
