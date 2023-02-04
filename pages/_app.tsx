import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import {
	EthereumClient,
	modalConnectors,
	walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { polygonMumbai } from "wagmi/chains";

const chains = [polygonMumbai];

const { provider } = configureChains(chains, [
	walletConnectProvider({ projectId: "27c67e4e9ac30f645f15cc77750db1b4" }),
]);

const wagmiClient = createClient({
	autoConnect: true,
	connectors: modalConnectors({
		projectId: "27c67e4e9ac30f645f15cc77750db1b4",
		version: "2",
		appName: "0xClans",
		chains,
	}),
	provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

const queryClient = new QueryClient();

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<WagmiConfig client={wagmiClient}>
					<SessionProvider session={session}>
						<Component {...pageProps} />
					</SessionProvider>
				</WagmiConfig>
			</QueryClientProvider>

			<Web3Modal
				projectId="27c67e4e9ac30f645f15cc77750db1b4"
				ethereumClient={ethereumClient}
			/>
		</>
	);
}
