import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import passport from "./passport";
import { ironSession } from "iron-session/express";
import { sessionOptions } from "./sessionOptions";
import session from "cookie-session";

export default function getHandler() {
	return nextConnect<NextApiRequest, NextApiResponse>()
		.use(ironSession(sessionOptions))
		.use(passport.initialize())
		.use(passport.session());
}
