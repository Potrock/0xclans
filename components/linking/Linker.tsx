import { useAccount, useContractRead } from "wagmi";
import AccountLinker from "contracts/AccountLinker.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../elements/Button";

export const Linker = ({ platformName }: { platformName: string }) => {
	const [isLinked, setIsLinked] = useState(false);
	const router = useRouter();
	const { address } = useAccount();
	const { data: currLinkedId } = useContractRead({
		address: AccountLinker.address as `0x${string}`,
		abi: AccountLinker.abi,
		functionName: "getUuidByAddressByPlatform",
		args: [address, platformName.toLowerCase()],
	});

	useEffect(() => {
		if (currLinkedId !== "") {
			setIsLinked(true);
		}
	}, [currLinkedId]);

	async function doLinkFlow() {
		router.push("/api/auth/" + platformName.toLowerCase() + "/login");
	}

	return (
		<div>
			<Button disabled={isLinked} onClick={doLinkFlow}>
				{isLinked ? <p>Connected! ✅ </p> : <p>Connect on-chain! 🚀</p>}
			</Button>
		</div>
	);
};
