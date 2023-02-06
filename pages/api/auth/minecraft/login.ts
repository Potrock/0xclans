import passport from "../../../../lib/passport";
import getHandler from "../../../../lib/router";

const path = "api/auth/azure/login";

export default getHandler()
	.use(
		path,
		passport.authenticate("azuread-openidconnect", {
			session: false,
			failureRedirect: "/",
		})
	)
	.get(path, (_: any, res: any) => res.redirect("/"));
