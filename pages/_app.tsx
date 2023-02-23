import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { polygonMumbai } from "wagmi/chains";
import { Layout } from "@/components/layout";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const chains = [polygonMumbai];

const { provider } = configureChains(chains, [
	alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "" }),
	publicProvider(),
]);

const { connectors } = getDefaultWallets({
	appName: "0xClans",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

const queryClient = new QueryClient();

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<WagmiConfig client={wagmiClient}>
					<RainbowKitProvider chains={chains}>
						<SessionProvider session={session}>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</SessionProvider>
					</RainbowKitProvider>
				</WagmiConfig>
			</QueryClientProvider>
		</>
	);
}
