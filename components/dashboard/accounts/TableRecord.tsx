import { Linker } from "@/components/dashboard/linking/Linker";

type TableRecordProps = {
	accountType: string;
	accountValue?: string;
	onStep: boolean;
};

export const TableRecord = ({
	accountType,
	accountValue,
	onStep,
}: TableRecordProps) => {
	console.log(accountType, accountValue, onStep);
	return (
		<>
			<tr className="bg-gray-700">
				<td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
					{accountType}
				</td>
				<td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
					{!onStep && <p className="font-normal">❌ Link Wallet</p>}
					{!accountValue && onStep && (
						<Linker platformName={accountType} />
					)}
					{accountValue && onStep && <p>✅</p>}
				</td>
			</tr>
		</>
	);
};
