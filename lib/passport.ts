import passport from "passport";
import SteamStrategy from "passport-steam";
import { OIDCStrategy } from "passport-azure-ad";

passport.use(
	new SteamStrategy(
		{
			returnURL: "http://localhost:3000/api/auth/steam/return",
			realm: "http://localhost:3000/",
			apiKey: `${process.env.STEAM_API_KEY}`,
		},
		(_, profile, done) => {
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
			loggingLevel: "info",
			validateIssuer: false,
			tenantIdOrName: "consumers",
			allowHttpForRedirectUrl: true,
			redirectUrl: "http://localhost:3000/api/auth/azure/return",
			clientSecret: `${process.env.AZURE_CLIENT_SECRET}`,
			scope: "openid offline_access profile email XboxLive.signin",
			identityMetadata:
				"https://login.microsoftonline.com/consumers/v2.0/.well-known/openid-configuration",
		},
		async (iss, sub, profile, accessToken, refreshToken, done) => {
			const fwd = {
				accessToken: accessToken,
			};
			done(null, fwd);
		}
	)
);

export default passport;
