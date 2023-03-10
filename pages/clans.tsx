import { CreateClan } from "@/components/clans/CreateClan";
import { ClanExplorerTable } from "@/components/clans/listing/ClanExplorerTable";
import { getUserLinkedWallet } from "@/lib/db/utils";
import { getClans } from "@/lib/graph";
import { GetClansResultsType } from "@/lib/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

type ClanProps = {
	session: Session;
	wallet?: {
		address: string;
	};
	clans?: GetClansResultsType;
};

export default function Clans({ session, wallet, clans }: ClanProps) {
	return (
		<div className="w-9/12 mx-auto ">
			<CreateClan />
			<h1 className="pt-6 text-xl font-bold">Clan Browser</h1>
			{clans && <ClanExplorerTable clans={clans} />}
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
}: GetServerSidePropsContext) => {
	const session = await getSession({ req });
	if (session) {
		const wallet = await getUserLinkedWallet(session.user.id);

		if (!wallet || !wallet.address) {
			return {
				redirect: {
					destination: "/profile?linkWallet=true",
					permanent: false,
				},
			};
		}

		let clans = await getClans();

		return {
			props: {
				session: session,
				wallet: wallet,
				clans: clans,
			},
		};
	}
	return { redirect: { destination: "/auth/signin", permanent: false } };
};
