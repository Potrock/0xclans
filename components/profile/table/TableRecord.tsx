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
			<Table.Row className="py-4 bg-gray-800">
				<Table.Cell className="items-center pl-4 font-medium text-white whitespace-nowrap">
					{accountType}
				</Table.Cell>
				<Table.Cell>
					{accountValue && <p>Connected</p>}
					{!accountValue && (
						<DatabaseLinker platformName={accountType} />
					)}
				</Table.Cell>
				<Table.Cell>
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
