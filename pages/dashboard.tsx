import { CompleteAuthModal } from "@/components/dashboard/linking/CompleteAuthModal";
import { LinkWallet } from "@/components/dashboard/linking/LinkWallet";
import { AccountTable } from "@/components/dashboard/table/AccountTable";
import { getUserLinkedAccounts, getUserLinkedWallet } from "@/lib/db/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import AccountLinker from "contracts/AccountLinker.json";
import { getUserProfile } from "@/lib/graph";
import { ClanTable } from "@/components/dashboard/clans/ClanTable";
import { Button } from "@/components/elements/Button";
import Link from "next/link";

type ProfileProps = {
	accounts?: {
		minecraft?: string;
		steam?: string;
	};
	wallet?: {
		address: string;
	};
	link?: {
		linking: boolean;
		platform: string;
		sig: string;
		plaformId: string;
	};
	clans?: {
		name: string;
		id: string;
		symbol: string;
	}[];
	session: Session;
};
export default function Dashboard(props: ProfileProps) {
	const { address, isConnected } = useAccount();
	const [connected, setConnected] = useState(false);
	const [isDifferentAddress, setIsDifferentAddress] = useState(false);
	const [showCompleteAuthFlow, setShowCompleteAuthFlow] = useState(false);

	const { data: session } = useSession();

	const router = useRouter();

	const { config } = usePrepareContractWrite({
		address: AccountLinker.address as `0x${string}`,
		abi: AccountLinker.abi,
		functionName: "linkPlayerToUuidByPlatform",
		args: [
			props.link?.plaformId,
			props.link?.platform.toLowerCase(),
			props.link?.sig,
		],
		enabled: props.link && props.link.linking,
	});

	const {
		write: linkChain,
		isLoading,
		isSuccess,
		isError,
	} = useContractWrite(config);

	/**
	 * @todo
	 * Convert this to SSR props
	 */
	useEffect(() => {
		if (
			props.link &&
			props.link.linking &&
			props.link.platform &&
			props.link.sig &&
			props.link.plaformId
		) {
			setShowCompleteAuthFlow(true);
		}
	}, []);

	useEffect(() => {
		if (isSuccess || isError) {
			router.replace("/dashboard");
		}
	}, [isLoading]);

	useEffect(() => {
		if (isConnected) {
			if (address && props.wallet) {
				if (address !== props.wallet.address) {
					setIsDifferentAddress(true);
				} else {
					setIsDifferentAddress(false);
				}
			}
		}
	}, [isConnected, address, props.wallet]);

	useEffect(() => {
		if (isConnected) {
			setConnected(true);
		} else {
			setConnected(false);
		}
	}, [isConnected]);

	return (
		<>
			{props.link && (
				<CompleteAuthModal
					link={{
						platform: props.link.platform,
						id: props.link.plaformId,
						sig: props.link.sig,
						wallet: props.wallet?.address || "",
						write: linkChain ?? (() => {}),
					}}
					show={showCompleteAuthFlow}
					setShow={setShowCompleteAuthFlow}
				/>
			)}
			<div className="flex flex-col">
				{session && (
					<p className="pt-8 text-3xl font-bold">
						Welcome back, {session.user.name}
					</p>
				)}
				<div className="pt-8">
					<ConnectButton />
					<div className="pt-4">
						{isDifferentAddress && (
							<p className="text-red-500 ">
								Your wallet address is different from the one in
								our database. Please change accounts in your
								wallet or contact support.
							</p>
						)}
						{!connected && props.wallet && (
							<p className="text-red-500 ">
								We have a wallet registered to your discord
								account, but it&apos;s not currently connected
								to the page. Please connect it using the button
								above.
							</p>
						)}
					</div>
					{!props.wallet && <LinkWallet />}
				</div>
				<div className="pt-6">
					<div className="">
						<p className="text-xl font-semibold">Your Accounts</p>
						<AccountTable accounts={props.accounts} />
					</div>
				</div>
				<div>
					<p className="pt-6 text-xl font-semibold">Your Clans</p>
					{props.clans && <ClanTable clans={props.clans} />}
					{!props.clans && (
						<>
							<p className="pt-4">
								You don&apos;t have any clans yet. Create one
								using the button below.
							</p>
							<Link href="/clans">
								<Button>
									<span>Clan Dashboard</span>
								</Button>
							</Link>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	query,
}: GetServerSidePropsContext) => {
	const session = await getSession({ req });
	if (session) {
		let props = {};
		const userAccounts = await getUserLinkedAccounts(session.user.id);

		const wallet = await getUserLinkedWallet(session.user.id);

		if (wallet) {
			const clans = await getUserProfile(wallet.address);
			if (clans) {
				props = { ...props, clans: clans.user.clans };
			}
		}

		props = { ...props, session: session };

		if (userAccounts && (userAccounts.steam || userAccounts.minecraft)) {
			props = { ...props, accounts: userAccounts };
		}

		if (wallet) {
			props = { ...props, wallet: wallet };
		}

		if (query) {
			if (
				query.link === "true" &&
				query.sig &&
				query.platform &&
				query.id
			) {
				props = {
					...props,
					link: {
						linking: true,
						platform: query.platform as string,
						sig: query.sig as string,
						plaformId: query.id as string,
					},
				};
			}
		}

		return { props: props };
	}
	return { redirect: { destination: "/auth/signin", permanent: false } };
};
