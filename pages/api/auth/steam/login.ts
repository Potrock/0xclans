import passport from "../../../../lib/passport";
import getHandler from "../../../../lib/router";
import { ironSession } from "iron-session/express";
import { sessionOptions } from "@/lib/sessionOptions";

const path = "/api/auth/steam/login";

export default getHandler()
	.use(path, passport.authenticate("steam", { failureRedirect: "/" }))
	.get(path, (_: any, res: any) => res.redirect("/"));
