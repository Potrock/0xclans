import { useSession } from "next-auth/react";
import { FunctionComponent, useState } from "react";
import {
	useContractWrite,
	usePrepareContractWrite,
	useSignMessage,
} from "wagmi";
import AccountLinker from "../../contracts/AccountLinker.json";

type AccountLinkProps = {
	platform: string;
	uuid: string;
};

export const AccountLink: FunctionComponent<AccountLinkProps> = ({
	platform,
	uuid,
}) => {
	const { data: session } = useSession();

	const [authSignature, setAuthSignature] = useState<string>("");

	const { isSuccess, signMessageAsync } = useSignMessage({
		message:
			"Sign the following message so we can authenticate your wallet: \n" +
			session?.user.id,
	});

	const seekAuth = async (signature: string, platform: string) => {
		const res = await fetch(
			"/api/link/approve?sig=" + signature + "&platform=" + platform
		);
		const data = await res.json();
		if (data) {
			if (data.signature) {
				return data.signature;
			}
		}
	};

	const { config } = usePrepareContractWrite({
		address: AccountLinker.address as `0x${string}`,
		abi: AccountLinker.abi,
		functionName: "linkPlayerToUuidByPlatform",
		args: [uuid, platform, authSignature],
		enabled: authSignature === "" ? false : true,
	});

	const {
		data,
		isLoading,
		isSuccess: linkSuccess,
		write: linkOnChain,
	} = useContractWrite(config);

	const link = async () => {
		const signedMessage = await signMessageAsync();
		if (isSuccess) {
			const authorizationSignature = await seekAuth(
				signedMessage as string,
				platform
			);
			if (!authorizationSignature) {
				console.log("The server returned no signature");
			}
			if (authorizationSignature) {
				setAuthSignature(authorizationSignature);
				if (linkOnChain) {
					linkOnChain();
				}
			}
		}
	};

	return (
		<>
			<button className="btn-primary btn" onClick={() => link()}>
				Link {platform}
			</button>
		</>
	);
};
