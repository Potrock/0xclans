import { AccountTable } from "@/components/profile/table/AccountTable";
import { getUserLinkedAccounts } from "@/lib/db/utils";
import { Table } from "flowbite-react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

type ProfileProps = {
	accounts?: {
		minecraft?: string;
		steam?: string;
	};
	session: Session;
};

export default function Profile(props: ProfileProps) {
	return (
		<div className="flex flex-col">
			<p className="pt-16 text-3xl font-bold">Profile</p>
			<div className="pt-16">
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
	return { redirect: { destination: "/" } };
};
