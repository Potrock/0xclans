import { useAccount, useContractRead } from "wagmi";
import ClanFactoryClones from "contracts/ClanFactoryClones.json";
import { ClanListingItem } from "./ClanListingItem";
import { useEffect, useState } from "react";
import { GetClansResultsType } from "@/lib/types";

type ListingProps = {
	clans: GetClansResultsType;
};

export const Listing = ({ clans }: ListingProps) => {
	const { isConnected } = useAccount();
	const { data: clanCount, isLoading } = useContractRead({
		address: ClanFactoryClones.address as `0x${string}`,
		abi: ClanFactoryClones.abi,
		functionName: "allClansLength",
	});

	return (
		<div className="flex flex-col pt-6">
			<div className="overflow-x-auto">
				<div className="inline-block min-w-full py-2">
					<div className="overflow-hidden">
						<table className="min-w-full rounded">
							<thead className="bg-gray-800 border-b">
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
								</tr>
							</thead>
							<tbody>
								{clans.map((clan) => (
									<ClanListingItem {...clan} />
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
