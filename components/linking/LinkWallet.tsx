import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSignMessage } from "wagmi";

export const LinkWallet = () => {
	const { data: session } = useSession();

	const [isLoading, setIsLoading] = useState<Boolean>(false);

	const { isSuccess, signMessageAsync } = useSignMessage({
		message:
			"Sign this message to link your wallet to your 0xClans account: \n" +
			session?.user.id,
	});

	const link = async () => {
		setIsLoading(true);
		const signedMsg = await signMessageAsync();
		const res = await fetch("/api/wallet/link?signedMsg=" + signedMsg);
		if (res.status === 200) {
			// Linking successful
			console.log("Wallet linked");
		}
		setIsLoading(false);
	};

	return (
		<>
			<button onClick={() => link()} className="btn btn-primary">
				Link Wallet
			</button>
		</>
	);
};
