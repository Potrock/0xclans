import { getSession, signIn, useSession, signOut } from "next-auth/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getUserLinkedAccounts } from "@/lib/db/utils";
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
