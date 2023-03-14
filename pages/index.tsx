import { getSession, signIn, useSession, signOut } from "next-auth/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getUserLinkedAccounts } from "@/lib/db/utils";
import { Session } from "next-auth";
import {
	ArrowRightIcon,
	ComputerDesktopIcon,
	LinkIcon,
	PaintBrushIcon,
	ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import gaminghero from "../assets/gaminghero.png";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

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
		<>
			<Head>
				<title>0xClans</title>
			</Head>
			<div className="bg-gray-900">
				{/* Hero section */}
				<section className="flex flex-col items-center px-4 py-12 md:px-24 lg:px-48 md:flex-row">
					<div className="md:w-1/2">
						<h1 className="mb-8 text-5xl font-bold leading-tight text-yellow-400">
							Create and Manage Your Gaming Clans with 0xClans
						</h1>
						<p className="mb-8 text-xl text-gray-300">
							Connect your crypto wallet and video game accounts
							to 0xClans to easily create, deploy, and manage
							decentralized gaming clans on the Polygon Network.
						</p>
						<Link
							href="/auth/signin"
							className="inline-flex items-center px-6 py-4 mb-4 text-lg font-medium text-white bg-yellow-400 rounded-md hover:bg-yellow-500"
						>
							Get Started
							<ArrowRightIcon className="ml-2" />
						</Link>
					</div>
					<div className="md:w-1/2">
						<Image
							src={gaminghero}
							alt="Gaming clan illustration"
							className="w-full h-auto"
						/>
					</div>
				</section>

				{/* Features section */}
				<section
					className="px-4 py-12 text-gray-300 md:px-24 lg:px-48"
					id="features"
				>
					<div className="mb-16">
						<h2 className="mb-2 text-3xl font-bold text-yellow-400">
							Key Features
						</h2>
						<p className="text-lg">
							Take advantage of the following features when you
							create and manage your gaming clans with 0xClans:
						</p>
					</div>
					<div className="flex flex-col md:flex-row md:-mx-4">
						<div className="px-4 mb-8 md:w-1/3">
							<div className="flex items-center mb-4">
								<LinkIcon className="w-9/12 mr-4 text-4xl" />
								<h3 className="text-2xl font-bold text-gray-200">
									Cross Platform Linking
								</h3>
							</div>
							<p className="text-lg">
								Connect your video game accounts to 0xClans to
								easily deploy and manage your gaming clans and
								presence online.
							</p>
						</div>
						<div className="px-4 mb-8 md:w-1/3">
							<div className="flex items-center mb-4">
								<ShieldCheckIcon className="w-9/12 mr-4 text-4xl" />
								<h3 className="text-2xl font-bold text-gray-200">
									Secure and Decentralized
								</h3>
							</div>
							<p className="text-lg">
								Enjoy the benefits of decentralized technology
								and have full control over your gaming assets,
								together.
							</p>
						</div>
						<div className="px-4 mb-8 md:w-1/3">
							<div className="flex items-center mb-4">
								<PaintBrushIcon className="w-9/12 mr-4 text-4xl" />
								<h3 className="text-2xl font-bold text-gray-200">
									Flexible and Customizable
								</h3>
							</div>
							<p className="text-lg">
								Assign roles and permissions to your clan
								members and customize your clan to your liking.
							</p>
						</div>
					</div>
				</section>
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
