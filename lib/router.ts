import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import passport from "./passport";
import session from "cookie-session";

export default function getHandler() {
	return nextConnect<NextApiRequest, NextApiResponse>()
		.use(
			session({
				name: "cookieSession",
				maxAge: 24 * 60 * 60 * 1000,
				secret: process.env.NEXTAUTH_SECRET,
			})
		)
		.use(passport.initialize())
		.use(passport.session());
}
