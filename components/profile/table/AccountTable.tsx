import { Table } from "flowbite-react";
import { TableRecord } from "./TableRecord";

type AccountTableProps = {
	accounts?: {
		minecraft?: string;
		steam?: string;
	};
};

export const AccountTable = ({ accounts }: AccountTableProps) => {
	return (
		<Table className="mt-4 border-transparent table-auto">
			<Table.Head className="text-xl text-white bg-gray-700">
				<Table.HeadCell>Platform Name</Table.HeadCell>
				<Table.HeadCell>Connect</Table.HeadCell>
				<Table.HeadCell>On Chain</Table.HeadCell>
			</Table.Head>
			<Table.Body className="border-transparent divide-y">
				<TableRecord
					accountType="Minecraft"
					accountValue={accounts?.minecraft}
				/>
				<TableRecord
					accountType="Steam"
					accountValue={accounts?.steam}
				/>
			</Table.Body>
		</Table>
	);
};
