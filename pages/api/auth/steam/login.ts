import passport from "../../../../lib/oauth/passport";
import getHandler from "../../../../lib/oauth/router";

const path = "/api/auth/steam/login";

export default getHandler()
	.use(path, passport.authenticate("steam", { failureRedirect: "/" }))
	.get(path, (_: any, res: any) => res.redirect("/"));
