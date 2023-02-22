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
			<tr className="bg-gray-700">
				<td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
					{accountType}
				</td>
				<td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
					{accountValue && <p>Connected</p>}
					{!accountValue && (
						<DatabaseLinker platformName={accountType} />
					)}
				</td>
				<td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
					<OnchainLinker
						platformName={accountType}
						uuid={accountValue || ""}
						isActive={accountValue ? true : false}
					/>
				</td>
			</tr>
		</>
	);
};
