import { useContractRead } from "wagmi";
import AccountLinker from "contracts/AccountLinker.json";

type OnchainStatusProps = {
	platformName: string;
	uuid: string;
	isActive: boolean;
};

export const OnchainStatus = ({
	platformName,
	uuid,
	isActive,
}: OnchainStatusProps) => {
	const { data: currLinkedAddress } = useContractRead({
		address: AccountLinker.address as `0x${string}`,
		abi: AccountLinker.abi,
		functionName: "getAddressByUuidByPlatform",
		args: [uuid, platformName.toLowerCase()],
	});

	return (
		<div>
			<>
				{currLinkedAddress ==
					"0x0000000000000000000000000000000000000000" && (
					<p>Connect on-chain! 🚀</p>
				)}
				{currLinkedAddress !=
					"0x0000000000000000000000000000000000000000" && (
					<p>Connected! ✅ </p>
				)}
			</>
		</div>
	);
};
