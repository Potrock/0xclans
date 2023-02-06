import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import getServerSession from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

export default function SignIn({
	providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<>
			{Object.values(providers).map((provider) => (
				<div key={provider.name}>
					<button onClick={() => signIn(provider.id)}>
						Sign in with {provider.name}
					</button>
				</div>
			))}
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(
		context.req as any,
		context.res as any,
		authOptions
	);

	if (session) {
		return { redirect: { destination: "/" } };
	}

	const providers = (await getProviders()) as any;

	return {
		props: { providers: Object.values(providers) ?? [] },
	};
}
