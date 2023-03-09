import { TableRecord } from "./TableRecord";

export const ClanTable = ({
	clans,
}: {
	clans: { name: string; id: string; symbol: string }[];
}) => {
	return (
		<div className="flex flex-col">
			<div className="overflow-x-auto">
				<div className="inline-block min-w-full py-2">
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
										Address
									</th>
									<th
										scope="col"
										className="px-6 py-4 text-sm font-medium text-left text-center text-white"
									>
										Manage
									</th>
								</tr>
							</thead>
							<tbody>
								{clans.map((clan) => (
									<TableRecord
										key={clan.id}
										name={clan.name}
										symbol={clan.symbol}
										id={clan.id}
									/>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
