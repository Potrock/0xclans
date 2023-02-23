import { LinkWallet } from "@/components/linking/LinkWallet";
import { AccountTable } from "@/components/profile/table/AccountTable";
import { getUserLinkedAccounts, getUserLinkedWallet } from "@/lib/db/utils";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
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
	 * TODO: handle linkWallet=true in query
	 */

	const { connect } = useConnect();
	const { address, isConnected } = useAccount();
	const [connected, setConnected] = useState(false);
	const [isDifferentAddress, setIsDifferentAddress] = useState(false);

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
		<div className="flex flex-col">
			<p className="pt-16 text-3xl font-bold">Profile</p>
			<div className="pt-2">
				<button
					className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm disabled:bg-gray-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					disabled={connected}
					onClick={() => connect}
				>
					Connect Wallet
				</button>
				<div>
					{isDifferentAddress && (
						<p className="pt-2 text-red-500">
							Your wallet address is different from the one in our
							database. Please change accounts in your wallet or
							contact support.
						</p>
					)}
				</div>
				{!props.wallet && <LinkWallet />}
			</div>
			<div className="pt-8">
				<div className="">
					<p className="text-xl font-semibold">Your Accounts</p>
					<AccountTable accounts={props.accounts} />
				</div>
			</div>
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
