import { ClanListingItem } from "./ClanListingItem";
import { GetClansResultsType } from "@/lib/types";

type ListingProps = {
	clans: GetClansResultsType;
};

export const Listing = ({ clans }: ListingProps) => {
	return (
		<div className="flex flex-col pt-2">
			<div className="overflow-x-auto">
				<div className="inline-block min-w-full">
					<div className="overflow-hidden">
						<table className="min-w-full rounded">
							<thead className="bg-gray-800">
								<tr>
									<th
										scope="col"
										className="px-6 py-4 text-sm font-medium text-left text-white"
									>
										Clan Name
									</th>
									<th
										scope="col"
										className="px-6 py-4 text-sm font-medium text-left text-white"
									>
										Symbol
									</th>
									<th
										scope="col"
										className="px-6 py-4 text-sm font-medium text-left text-white"
									>
										Member Count
									</th>
									<th
										scope="col"
										className="px-6 py-4 text-sm font-medium text-left text-white"
									>
										Contract
									</th>
									<th scope="col">

									</th>
								</tr>
							</thead>
							<tbody>
								{clans.map((clan) => (
									<ClanListingItem {...clan} key={clan.id} />
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
