import { TableRecord } from "./TableRecord";

type AccountTableProps = {
	accounts?: {
		minecraft?: string;
		steam?: string;
	};
};

export const AccountTable = ({ accounts }: AccountTableProps) => {
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
										Platform Name
									</th>
									<th
										scope="col"
										className="px-6 py-4 text-sm font-medium text-left text-white"
									>
										On Chain Status
									</th>
								</tr>
							</thead>
							<tbody>
								<TableRecord
									accountType="Minecraft"
									accountValue={accounts?.minecraft}
								/>
								<TableRecord
									accountType="Steam"
									accountValue={accounts?.steam}
								/>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
