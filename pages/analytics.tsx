import { getAnalytics } from "@/lib/graph";
import { GetAnalyticsResultType } from "@/lib/types";
import {
	UserCircleIcon,
	CircleStackIcon,
	LinkIcon,
	ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
export default function Analytics({
	userCount,
	accountCount,
	clanCount,
}: {
	userCount: number;
	accountCount: number;
	clanCount: number;
}) {
	return (
		<div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
			<div className="grid grid-cols-2 gap-6 md:grid-cols-4">
				<div className="overflow-hidden bg-gray-800 rounded-lg shadow">
					<div className="px-4 py-5 sm:p-6">
						<div className="flex items-center">
							<UserCircleIcon className="w-12 h-12 mr-4 text-yellow-400" />
							<h3 className="text-2xl font-bold text-white">
								Number of Users
							</h3>
						</div>
						<div className="mt-6 text-3xl font-extrabold text-gray-300">
							{userCount}
						</div>
					</div>
				</div>

				<div className="overflow-hidden bg-gray-800 rounded-lg shadow">
					<div className="px-4 py-5 sm:p-6">
						<div className="flex items-center">
							<LinkIcon className="w-12 h-12 mr-4 text-yellow-400" />
							<h3 className="text-2xl font-bold text-white">
								Number of Accounts Linked
							</h3>
						</div>
						<div className="mt-6 text-3xl font-extrabold text-gray-300">
							{accountCount}
						</div>
					</div>
				</div>

				<div className="overflow-hidden bg-gray-800 rounded-lg shadow">
					<div className="px-4 py-5 sm:p-6">
						<div className="flex items-center">
							<ShieldCheckIcon className="w-12 h-12 mr-4 text-yellow-400" />
							<h3 className="text-2xl font-bold text-white">
								Number of Clans
							</h3>
						</div>
						<div className="mt-6 text-3xl font-extrabold text-gray-300">
							{clanCount}
						</div>
					</div>
				</div>

				<div className="overflow-hidden bg-gray-800 rounded-lg shadow">
					<div className="px-4 py-5 sm:p-6">
						<div className="flex items-center">
							<CircleStackIcon className="w-12 h-12 mr-4 text-yellow-400" />
							<h3 className="text-2xl font-bold text-white">
								Supported Platforms
							</h3>
						</div>
						<div className="mt-6 text-xl font-medium text-gray-300">
							<ul className="ml-5 list-disc">
								<li>Minecraft</li>
								<li>Steam</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
}: GetServerSidePropsContext) => {
	const analytics: GetAnalyticsResultType = await getAnalytics();

	console.log(analytics);

	return {
		props: {
			userCount: analytics.userFactory.userCount,
			accountCount: analytics.userFactory.accountCount,
			clanCount: analytics.clanFactory.clanCount,
		},
	};
};
