import { unstable_getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextauth]";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/sessionOptions";

export default function Home() {
	const { data: session } = useSession();

	const router = useRouter();

	const steam = async () => {
		router.push("/api/auth/steam/login");
	};

	const azure = async () => {
		router.push("/api/auth/azure/login");
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-4xl font-bold">0xClans</h1>
			<div className="flex flex-col">
				{session && <p>Welcome back, {session.user?.name}</p>}
				{!session && <button onClick={() => signIn()}>Sign in</button>}
			</div>
			<div>
				<button onClick={() => steam()} className="bg-blue-500">
					Sign in with Steam
				</button>
			</div>
			<div>
				<button onClick={() => azure()} className="bg-blue-500">
					Sign in with Azure
				</button>
			</div>
		</div>
	);
}

export const getServerSideProps = withIronSessionSsr(async function ({
	req,
	res,
}) {
	console.log(req.session);
	const steamId = req.session.steamId;
	const msftAccessToken = req.session.mstfAccessToken;

	const discordSession = await unstable_getServerSession(
		req,
		res,
		authOptions
	);

	console.log(discordSession, "discordSession");
	console.log(steamId, "steamId");
	console.log(msftAccessToken, "msftAccessToken");
	if (!steamId) {
		return {
			props: { session: discordSession },
		};
	}
	return {
		props: { steamId: req.session.steamId },
	};
},
sessionOptions);
