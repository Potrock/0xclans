import { BriefcaseIcon } from "@heroicons/react/24/outline";

export default function Clans({ clans }: any) {
	return (
		<div className="p-4 bg-gray-800 rounded-md shadow-md">
			<div className="flex items-center mb-4">
				<BriefcaseIcon className="w-5 h-5 mr-4 text-white" />
				<h3 className="text-lg font-medium text-white">Clans</h3>
			</div>
			{clans.map((clan: any) => (
				<div key={clan.id} className="mb-4">
					<div className="flex items-center justify-between mb-2">
						<h4 className="text-sm font-medium text-gray-300">
							{clan.name}
						</h4>
						<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-gray-900">
							{clan.symbol}
						</span>
					</div>
					<p className="text-sm text-gray-200">Clan Description</p>
				</div>
			))}
		</div>
	);
}
