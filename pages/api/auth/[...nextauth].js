import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import prisma from "../../../lib/prisma";

export const authOptions = {
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
		}),
	],
	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async session({ session, user }) {
			if (user && user.id) {
				session.user.id = user.id;
			}
			return session;
		},
	},
};
export default NextAuth(authOptions);
