import { Button } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSignMessage } from "wagmi";

export const LinkWallet = () => {
	const { data: session } = useSession();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { isSuccess, signMessageAsync } = useSignMessage({
		message:
			"Sign this message to link your wallet to your 0xClans account: \n" +
			session?.user.id,
	});

	const link = async () => {
		setIsLoading(true);
		const signedMsg = await signMessageAsync();
		const res = await fetch(
			"/api/auth/wallet/link?signedMsg=" + signedMsg.toString()
		);
		if (res.status === 200) {
			// Linking successful
			console.log("Wallet linked");
		}
		setIsLoading(false);
	};

	return (
		<>
			<Button
				disabled={isLoading}
				onClick={() => link()}
				className="px-2"
				color="success"
			>
				Link Wallet
			</Button>
		</>
	);
};
