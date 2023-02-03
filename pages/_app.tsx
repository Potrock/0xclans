import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const queryClient = new QueryClient();

const { chains, provider, webSocketProvider } = configureChains(
	[polygonMumbai],
	[
		alchemyProvider({
			apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "",
		}),
		publicProvider(),
	]
);

const wagmiClient = createClient({
	autoConnect: true,
	connectors: [
		new MetaMaskConnector({ chains }),
		// new CoinbaseWalletConnector({
		// 	chains,
		// 	options: {
		// 		appName: "0xClans",
		// 	},
		// }),
		// new WalletConnectConnector({
		// 	chains,
		// 	options: {
		// 		qrcode: true,
		// 	},
		// }),
		// new InjectedConnector({
		// 	chains,
		// 	options: {
		// 		name: "Injected",
		// 		shimDisconnect: true,
		// 	},
		// }),
	],
	provider,
	webSocketProvider,
});

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<WagmiConfig client={wagmiClient}>
				<SessionProvider session={session}>
					<Component {...pageProps} />
				</SessionProvider>
			</WagmiConfig>
		</QueryClientProvider>
	);
}
