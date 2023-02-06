import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import { getProviders, getSession, signIn } from "next-auth/react";

export default function SignIn({}: InferGetServerSidePropsType<
	typeof getServerSideProps
>) {
	return (
		<div className="flex justify-center">
			<button onClick={() => signIn("discord")} className="m-auto">
				Sign in with Discord
			</button>
		</div>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession(context);

	if (session) {
		return { redirect: { destination: "/" } };
	}

	const providers = (await getProviders()) as any;

	return { props: {} };
}
