import { Table } from "flowbite-react";

type AccountTableProps = {
	accounts?: {
		minecraft?: string;
		steam?: string;
	};
};

export const AccountTable = ({ accounts }: AccountTableProps) => {
	return (
		<Table className="table-auto">
			<Table.Head className="text-white bg-gray-700">
				<Table.HeadCell>Platform Name</Table.HeadCell>
				<Table.HeadCell>Connect</Table.HeadCell>
				<Table.HeadCell>On Chain</Table.HeadCell>
			</Table.Head>
			<Table.Body className="divide-y">
				<Table.Row className="py-4 bg-gray-800">
					<Table.Cell className="items-center pl-4 font-medium text-white whitespace-nowrap">
						Steam
					</Table.Cell>
					<Table.Cell>
						{accounts && accounts.steam && <p>Connected</p>}
						{(!accounts || !accounts.steam) && <p>Not Connected</p>}
					</Table.Cell>
					<Table.Cell>TODO: ON CHAIN STATUS</Table.Cell>
				</Table.Row>
				<Table.Row className="py-4 bg-gray-800">
					<Table.Cell className="items-center pl-4 font-medium text-white whitespace-nowrap">
						Minecraft
					</Table.Cell>
					<Table.Cell>
						{accounts && accounts.minecraft && <p>Connected</p>}
						{(!accounts || !accounts.minecraft) && (
							<p>Not Connected</p>
						)}
					</Table.Cell>
					<Table.Cell>TODO: ON CHAIN STATUS</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	);
};
