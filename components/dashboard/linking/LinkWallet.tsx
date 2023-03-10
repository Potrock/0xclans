import { useSession } from "next-auth/react";
import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";

export const LinkWallet = () => {
	const { data: session } = useSession();
	const { address } = useAccount();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { isSuccess, signMessageAsync } = useSignMessage({
		message:
			"Sign this message to link your wallet to your 0xClans account: \n" +
			session?.user.id,
	});

	const link = async () => {
		setIsLoading(true);
		if (!session || !address) {
			// No session or address, no linking
			setIsLoading(false);
			return;
		}
		if (!session.user.id) {
			// No user id, no linking
			setIsLoading(false);
			return;
		}
		const signedMsg = await signMessageAsync();
		const res = await fetch(
			"/api/auth/wallet/link?signedMsg=" +
				signedMsg.toString() +
				"&wallet=" +
				address
		);
		if (res.status === 200) {
			// Linking successful
			console.log("Wallet linked");
		} else {
			console.log(await res.json());
		}
		setIsLoading(false);
	};

	return (
		<>
			<button
				className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm disabled:bg-gray-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				disabled={isLoading}
				onClick={() => link()}
				color="success"
			>
				Link Wallet
			</button>
		</>
	);
};
