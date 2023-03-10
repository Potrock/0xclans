import { Linker } from "@/components/dashboard/linking/Linker";

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
					{!accountValue && <Linker platformName={accountType} />}
					{accountValue && <p>Linked ✅</p>}
				</td>
			</tr>
		</>
	);
};
