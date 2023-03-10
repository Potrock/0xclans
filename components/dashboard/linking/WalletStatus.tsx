import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LinkWallet } from "./LinkWallet";

export const WalletStatus = (props: {
	isDifferentAddress: boolean;
	connected: boolean;
	wallet?: { address: string };
}) => {
	return (
		<div className="flex flex-col items-center h-full bg-gray-800 rounded-md">
			<ConnectButton />
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
			{!props.wallet && <LinkWallet />}
		</div>
	);
};
