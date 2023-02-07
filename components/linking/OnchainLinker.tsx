import { Button } from "flowbite-react";
import { useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
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
			<Button className="px-2" onClick={linkAccount}>
				On Chain Link
			</Button>
		</div>
	);
};
