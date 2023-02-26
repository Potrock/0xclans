import { useContractRead } from "wagmi";
import ClanFactoryClones from "contracts/ClanFactoryClones.json";
import { GetClanResultType } from "@/lib/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import { truncateAddress } from "@/utils/helpers";

export const ClanListingItem = (clanInfo: GetClanResultType) => {
	return (
		<tr className="bg-gray-700">
			<td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
				{clanInfo.name}
			</td>
			<td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
				{clanInfo.symbol}
			</td>
			<td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
				{clanInfo.members.length}
			</td>
			<td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
				<Link
					href={`https://mumbai.polygonscan.com/address/${clanInfo.id}`}
					target="_blank"
					rel="noreferrer"
				>
					{truncateAddress(clanInfo.id)}
				</Link>
			</td>
			<td>
				<Link href={`/clans/${clanInfo.id}`} target="_blank" rel="noreferrer">
					<button className="inline-flex justify-center px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
						View
					</button>
				</Link>
			</td>
		</tr>
	);
};
