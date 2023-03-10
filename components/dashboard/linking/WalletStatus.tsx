import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { LinkWallet } from "./LinkWallet";

export const WalletStatus = (props: {
	isDifferentAddress: boolean;
	connected: boolean;
	wallet?: { address: string };
}) => {
	const { address, isConnected } = useAccount();

	useEffect(() => {
		if (address && props.wallet) {
		}
	}, [address, isConnected]);
	return (
		<div className="flex flex-col items-center h-full bg-gray-800 rounded-md">
			<div className="w-11/12 pt-4">
				<p className="text-xl font-semibold">
					Connect Your Crypto Wallet
				</p>
				<p className="pt-4 text-sm">
					Connect your wallet to our website, then link it to our
					network to access the rest of the platform.
				</p>
				<div className="flex pt-4 text-sm font-semibold">
					<p className="pt-2 align-middle">
						1. Connect your wallet to the website
					</p>
					<div className="mx-auto">
						<ConnectButton />
					</div>
				</div>
				<div className="flex pt-4 text-sm font-semibold">
					<p className="pt-2 align-middle">
						2. Link your wallet to our network
					</p>
					<div className="mx-auto">
						<LinkWallet />
					</div>
				</div>
			</div>

			<div className="pt-4">
				{props.isDifferentAddress && (
					<p className="text-red-500 ">
						Your wallet address is different from the one in our
						database. Please change accounts in your wallet or
						contact support.
					</p>
				)}
				{!props.connected && props.wallet && (
					<p className="text-red-500 ">
						We have a wallet registered to your discord account, but
						it&apos;s not currently connected to the page. Please
						connect it using the button above.
					</p>
				)}
			</div>
			{/* {!props.wallet && <LinkWallet />}
			{props.wallet && <p>Your wallet is linked</p>} */}
		</div>
	);
};
