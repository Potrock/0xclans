import Link from "next/link";

export const ConnectGameAccountsStep = () => {
	// Return a nice paragraph explaining to the user that they can connect their game accounts by logging in with that account and approving the connection in their wallet.
	// This should be a simple paragraph with a button that links to the login page.
	// The button should be disabled if the user is not logged in.
	// The button should be disabled if the user does not have a wallet linked.
	// The button should be disabled if the user has already connected game accounts.
	return (
		<div className="flex flex-col items-center h-full bg-gray-800 rounded-md">
			<div className="w-11/12 pt-4">
				<p className="text-xl font-semibold">Connect Game Accounts</p>
				<p className="pt-4 text-sm">
					You can connect your game accounts by logging in with that
					account and approving the connection in your wallet.
				</p>
			</div>
		</div>
	);
};
