import { CompleteAuthModal } from "@/components/dashboard/linking/CompleteAuthModal";
import { AccountTable } from "@/components/dashboard/accounts/AccountTable";
import { getUserLinkedAccounts, getUserLinkedWallet } from "@/lib/db/utils";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import AccountLinker from "contracts/AccountLinker.json";
import { getUserProfile } from "@/lib/graph";
import { ClanTable } from "@/components/dashboard/clans/ClanTable";
import { Button } from "@/components/elements/Button";
import Link from "next/link";
import { WalletStatus } from "@/components/dashboard/linking/WalletStatus";
import Steps from "@/components/dashboard/steps/Steps";
import { ConnectGameAccountsStep } from "@/components/dashboard/steps/ConnectGameAccountsStep";

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

	const [statusArr, setStatusArr] = useState([] as string[]);

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

		// do the above but with state
		let temp = statusArr;
		temp[0] = "complete";

		if (props.wallet && props.wallet.address) {
			temp[1] = "complete";
			temp[2] = "current";
		} else {
			temp[1] = "current";
			temp[2] = "upcoming";
		}

		setStatusArr(temp);
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

				<div className="pt-8 md:grid md:grid-cols-7">
					<div className="md:col-span-2 sm:pb-8 md:pb-0">
						<p className="pb-4 text-xl font-semibold">
							Get Started
						</p>
						<Steps status={statusArr} />
					</div>
					<div className="md:col-start-4 md:col-span-4">
						{statusArr[1] === "current" && (
							<WalletStatus
								wallet={props.wallet}
								connected={connected}
								isDifferentAddress={isDifferentAddress}
							/>
						)}
						{statusArr[2] === "current" && (
							<ConnectGameAccountsStep />
						)}
					</div>
				</div>
				<div className="pt-6">
					<p className="text-xl font-semibold">Your Accounts</p>
					<AccountTable
						accounts={props.accounts}
						onStep={statusArr[2] === "current"}
					/>
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

		const wallet = await getUserLinkedWallet(session.user.id);

		if (wallet) {
			const graphProfile = await getUserProfile(wallet.address);

			if (graphProfile) {
				let accounts = {};
				for (const account of graphProfile.user.accounts) {
					if (account.platform === "minecraft") {
						accounts = { ...accounts, minecraft: account.uuid };
					} else if (account.platform === "steam") {
						accounts = { ...accounts, steam: account.uuid };
					}
				}

				props = {
					...props,
					clans: graphProfile.user.clans,
					accounts: accounts,
				};
			}
		}

		props = { ...props, session: session };

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
