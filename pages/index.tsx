import { getSession, signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Web3Button } from "@web3modal/react";
import { getUserLinkedAccounts } from "@/lib/db/utils";
import { AccountLink } from "@/components/linking/AccountLink";
import { Session } from "next-auth";

type Props = {
	accounts?: {
		minecraft?: string;
		steam?: string;
	};
	session: Session;
};

export default function Home(props: Props) {
	const { data: session } = useSession();

	const router = useRouter();

	const steam = async () => {
		router.push("/api/auth/steam/login");
	};

	const azure = async () => {
		router.push("/api/auth/minecraft/login");
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-4xl font-bold">0xClans</h1>
			<div className="flex flex-col">
				{session && (
					<div>
						<p>Welcome back, {session.user?.name}</p>
						<button onClick={() => signOut()}>
							Sign out of Discord
						</button>
					</div>
				)}
				{!session && <button onClick={() => signIn()}>Sign in</button>}
			</div>
			{props.accounts && !props.accounts?.steam && (
				<div>
					<button onClick={() => steam()} className="bg-blue-500">
						Sign in with Steam
					</button>
				</div>
			)}
			{props.accounts && props.accounts.steam && (
				<p>Connected to Steam ID: {props.accounts.steam}</p>
			)}
			{props.accounts && !props.accounts.minecraft && (
				<div>
					<button onClick={() => azure()} className="bg-blue-500">
						Sign in with Azure
					</button>
				</div>
			)}
			{props.accounts && props.accounts.minecraft && (
				<p>Connected to Minecraft ID: {props.accounts.minecraft}</p>
			)}
			<Web3Button />
			{props.accounts && (
				<div>
					{props.accounts.steam && (
						<AccountLink
							platform="steam"
							uuid={props.accounts.steam}
						/>
					)}
					{props.accounts.minecraft && (
						<AccountLink
							platform="minecraft"
							uuid={props.accounts.minecraft}
						/>
					)}
				</div>
			)}
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
}: GetServerSidePropsContext) => {
	const session = await getSession({ req });
	if (session) {
		const userAccounts = await getUserLinkedAccounts(session.user.id);

		if (userAccounts) {
			return {
				props: {
					session: session,
					accounts: userAccounts,
				},
			};
		} else {
			return {
				props: { session: session },
			};
		}
	}
	return {
		props: { session: null },
	};
};
