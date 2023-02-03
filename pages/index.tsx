import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import prisma from "@/lib/prisma";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useConnect } from "wagmi";

export default function Home(props: any) {
	const { data: session } = useSession();

	const router = useRouter();

	const { connect, account, connectors } = useConnect();

	console.log(connectors);

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
			{props.user && !props.user.steam && (
				<div>
					<button onClick={() => steam()} className="bg-blue-500">
						Sign in with Steam
					</button>
				</div>
			)}
			{props.user && props.user.steam && (
				<p>Connected to Steam ID: {props.user.steam}</p>
			)}
			{props.user && !props.user.minecraft && (
				<div>
					<button onClick={() => azure()} className="bg-blue-500">
						Sign in with Azure
					</button>
				</div>
			)}
			{props.user && props.user.minecraft && (
				<p>Connected to Minecraft ID: {props.user.minecraft}</p>
			)}
			<button onClick={() => connect()}>Connect Wallet</button>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
}: GetServerSidePropsContext) => {
	const session = await getSession({ req });
	if (session) {
		const user = await prisma.user.findUnique({
			where: {
				id: session.user.id,
			},
			include: {
				Steam: {
					select: {
						steamId: true,
					},
				},
				Minecraft: {
					select: {
						minecraftId: true,
					},
				},
			},
		});

		return {
			props: {
				session: session,
				user: {
					steam: user?.Steam?.steamId,
					minecraft: user?.Minecraft?.minecraftId,
				},
			},
		};
	}
	return {
		props: { session: null },
	};
};
