import { DatabaseLinker } from "@/components/linking/DatabaseLinker";
import { OnchainLinker } from "@/components/linking/OnchainLinker";
import { Table } from "flowbite-react";

type TableRecordProps = {
	accountType: string;
	accountValue?: string;
};

export const TableRecord = ({
	accountType,
	accountValue,
}: TableRecordProps) => {
	return (
		<>
			<Table.Row className="py-4 bg-gray-800 border-transparent">
				<Table.Cell className="pl-4 text-lg font-medium text-center text-white whitespace-nowrap">
					{accountType}
				</Table.Cell>
				<Table.Cell className="text-center">
					{accountValue && <p>Connected</p>}
					{!accountValue && (
						<DatabaseLinker platformName={accountType} />
					)}
				</Table.Cell>
				<Table.Cell className="flex justify-center">
					<OnchainLinker
						platformName={accountType}
						uuid={accountValue || ""}
						isActive={accountValue ? true : false}
					/>
				</Table.Cell>
			</Table.Row>
		</>
	);
};
