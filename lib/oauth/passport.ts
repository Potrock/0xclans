import passport from "passport";
// @ts-ignore
import SteamStrategy from "passport-steam";
import { OIDCStrategy } from "passport-azure-ad";
import { getMinecraftInfoFromAccessToken } from "../utils";

passport.use(
	new SteamStrategy(
		{
			returnURL: "http://localhost:3000/api/auth/steam/return",
			realm: "http://localhost:3000/",
			apiKey: `${process.env.STEAM_API_KEY}`,
		},
		(_: any, profile: any, done: any) => {
			return done(null, profile);
		}
	)
);

passport.use(
	new OIDCStrategy(
		{
			clientID: `${process.env.AZURE_CLIENT_ID}`,
			responseType: "code",
			responseMode: "query",
			validateIssuer: false,
			// @ts-ignore
			tenantIdOrName: "consumers",
			allowHttpForRedirectUrl: true,
			redirectUrl: "http://localhost:3000/api/auth/minecraft/return",
			clientSecret: `${process.env.AZURE_CLIENT_SECRET}`,
			scope: "openid offline_access profile email XboxLive.signin",
			identityMetadata:
				"https://login.microsoftonline.com/consumers/v2.0/.well-known/openid-configuration",
		},
		async (
			iss: any,
			sub: any,
			profile: any,
			accessToken: any,
			refreshToken: any,
			done: any
		) => {
			const mcInfo = await getMinecraftInfoFromAccessToken(accessToken);
			done(null, mcInfo);
		}
	)
);

export default passport;
