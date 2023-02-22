import { LinkWallet } from "@/components/linking/LinkWallet";
import { AccountTable } from "@/components/profile/table/AccountTable";
import { getUserLinkedAccounts, getUserLinkedWallet } from "@/lib/db/utils";
import { Button } from "flowbite-react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
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

	return (
		<div className="flex flex-col">
			<p className="pt-16 text-3xl font-bold">Profile</p>
			<div className="pt-8">
				<Button onClick={() => connect}>Connect Wallet</Button>
				{props.wallet && props.wallet.address}
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
