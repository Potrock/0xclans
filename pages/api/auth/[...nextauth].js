import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async jwt({ token, user, account, profile, isNewUser }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
	},
};
export default NextAuth(authOptions);
