import { TableRecord } from "./TableRecord";

type AccountTableProps = {
	accounts?: {
		minecraft?: string;
		steam?: string;
	};
	onStep: boolean;
};

export const AccountTable = ({ accounts, onStep }: AccountTableProps) => {
	return (
		<div className="flex flex-col">
			<div className="overflow-x-auto">
				<div className="inline-block min-w-full py-2">
					<div className="overflow-hidden rounded-md">
						<table className="min-w-full">
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
									onStep={onStep}
								/>
								<TableRecord
									accountType="Steam"
									accountValue={accounts?.steam}
									onStep={onStep}
								/>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
