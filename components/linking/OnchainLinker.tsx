import { Button } from "components/elements/Button";
import { useState } from "react";
import {
	useContractRead,
	useContractWrite,
	usePrepareContractWrite,
} from "wagmi";
import AccountLinker from "contracts/AccountLinker.json";

type OnchainLinkerProps = {
	platformName: string;
	uuid: string;
	isActive: boolean;
};

export const OnchainLinker = ({
	platformName,
	uuid,
	isActive,
}: OnchainLinkerProps) => {
	const [authSignature, setAuthSignature] = useState<string>("");

	const { data: currLinkedAddress } = useContractRead({
		address: AccountLinker.address as `0x${string}`,
		abi: AccountLinker.abi,
		functionName: "getAddressByUuidByPlatform",
		args: [uuid, platformName.toLowerCase()],
	});

	const { config } = usePrepareContractWrite({
		address: AccountLinker.address as `0x${string}`,
		abi: AccountLinker.abi,
		functionName: "linkPlayerToUuidByPlatform",
		args: [uuid, platformName.toLowerCase(), authSignature],
		enabled: authSignature === "" ? false : true,
	});

	const { write: linkChain } = useContractWrite(config);

	const linkAccount = async () => {
		const response = await fetch(
			"/api/link/getLinkApproval?platformName=" + platformName
		);

		const data = await response.json();
		if (data.sig) {
			setAuthSignature(data.sig);
			if (linkChain) {
				linkChain();
			}
		}
	};

	return (
		<div>
			<Button
				onClick={linkAccount}
				disabled={
					currLinkedAddress !=
					"0x0000000000000000000000000000000000000000"
				}
			>
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
			</Button>
		</div>
	);
};
