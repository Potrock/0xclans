import { Button } from "flowbite-react";
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
			<div className="pt-40">
				<h1 className="text-3xl">Sign in with Discord</h1>
				<p className="pt-4">
					Click the link below to be redirected to Discord to log in.
				</p>
				<button
					onClick={() => signIn("discord")}
					className="mt-4 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 text-white focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
				>
					<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
						Sign in With Discord
					</span>
				</button>
			</div>
		</div>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession(context);

	if (session) {
		return { redirect: { destination: "/dashboard" } };
	}

	const providers = (await getProviders()) as any;

	return { props: {} };
}
