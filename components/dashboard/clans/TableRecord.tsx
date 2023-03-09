import { truncateAddress } from "@/utils/helpers";
import Link from "next/link";

export const TableRecord = ({
	name,
	symbol,
	id,
}: {
	name: string;
	symbol: string;
	id: string;
}) => {
	return (
		<tr className="bg-gray-700">
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-white">{name}</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-white">{symbol}</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-blue-500">
					<Link
						href={`https://mumbai.polygonscan.com/address/${id}`}
						target="_blank"
						rel="noreferrer"
					>
						{truncateAddress(id)}
					</Link>
				</div>
			</td>
			<td className="px-6 py-4 text-sm text-white whitespace-nowrap">
				<div className="flex items-center justify-center">
					<a
						href={`/clans/${id}`}
						className="px-4 py-2 font-medium text-white bg-blue-500 rounded-lg"
					>
						Manage
					</a>
				</div>
			</td>
		</tr>
	);
};
