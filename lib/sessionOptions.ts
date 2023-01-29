import type { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
	password: `${process.env.IRONSESSION_SECRET}`,
	cookieName: "ironsession",
	cookieOptions: {
		secure: process.env.NODE_ENV === "production",
		sameSite: "none",
	},
};

declare module "iron-session" {
	interface IronSessionData {
		steamId?: string;
		mstfAccessToken?: string;
	}
}
