import { useAccount, useContractRead } from "wagmi";
import AccountLinker from "contracts/AccountLinker.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../../elements/Button";

export const Linker = ({ platformName }: { platformName: string }) => {
	const [isLinked, setIsLinked] = useState(false);
	const router = useRouter();
	const { address } = useAccount();
	// const { data: currLinkedId } = useContractRead({
	// 	address: AccountLinker.address as `0x${string}`,
	// 	abi: AccountLinker.abi,
	// 	functionName: "getUuidByPlatformByPlayer",
	// 	args: [address, platformName.toLowerCase()],
	// 	enabled: address !== undefined && platformName !== undefined,
	// });

	const [isLoading, setIsLoading] = useState(false);

	// useEffect(() => {
	// 	if (currLinkedId !== undefined && currLinkedId) {
	// 		setIsLinked(true);
	// 	}
	// }, [currLinkedId]);

	async function doLinkFlow() {
		if (isLoading) return;
		setIsLoading(true);
		router.push("/api/auth/" + platformName.toLowerCase() + "/login");
	}

	return (
		<div>
			<Button loading={isLoading} onClick={doLinkFlow}>
				<p>Connect on-chain! 🚀</p>
			</Button>
		</div>
	);
};
