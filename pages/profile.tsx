import { CompleteAuthModal } from "@/components/linking/CompleteAuthModal";
import { LinkWallet } from "@/components/linking/LinkWallet";
import { AccountTable } from "@/components/profile/table/AccountTable";
import { getUserLinkedAccounts, getUserLinkedWallet } from "@/lib/db/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";

type ProfileProps = {
	accounts?: {
		minecraft?: string;
		steam?: string;
	};
	session: Session;
	wallet?: {
		address: string;
	};
};
export default function Profile(props: ProfileProps) {
	/**
	 * TODO: handle link=true in query
	 */

	const { address, isConnected } = useAccount();
	const [connected, setConnected] = useState(false);
	const [isDifferentAddress, setIsDifferentAddress] = useState(false);
	const [authSig, setAuthSig] = useState("");
	const [authPlatform, setAuthPlatform] = useState("");
	const [platformId, setPlatformId] = useState("");
	const [showCompleteAuthFlow, setShowCompleteAuthFlow] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (
			router.query.link === "true" &&
			router.query.sig &&
			router.query.platform &&
			router.query.id &&
			props.wallet?.address
		) {
			setShowCompleteAuthFlow(true);
			setAuthSig(router.query.sig as string);
			setAuthPlatform(router.query.platform as string);
			setPlatformId(router.query.id as string);
		}
	}, []);

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
			<CompleteAuthModal
				link={{
					platform: authPlatform,
					id: platformId,
					sig: authSig,
					wallet: props.wallet?.address || "",
				}}
				show={showCompleteAuthFlow}
				setShow={setShowCompleteAuthFlow}
			/>
			<div className="flex flex-col">
				<p className="pt-16 text-3xl font-bold">Profile</p>
				<div className="pt-4">
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
			</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
}: GetServerSidePropsContext) => {
	const session = await getSession({ req });
	if (session) {
		const userAccounts = await getUserLinkedAccounts(session.user.id);

		const wallet = await getUserLinkedWallet(session.user.id);

		if (userAccounts && (userAccounts.steam || userAccounts.minecraft)) {
			return {
				props: {
					session: session,
					accounts: userAccounts,
					wallet: wallet,
				},
			};
		} else {
			return {
				props: { session: session },
			};
		}
	}
	return { redirect: { destination: "/auth/signin", permanent: false } };
};
