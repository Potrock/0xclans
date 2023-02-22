import passport from "../../../../lib/oauth/passport";
import getHandler from "../../../../lib/oauth/router";

const path = "api/auth/minecraft/login";

export default getHandler()
	.use(
		path,
		passport.authenticate("azuread-openidconnect", {
			session: false,
			failureRedirect: "/",
		})
	)
	.get(path, (_: any, res: any) => res.redirect("/"));
