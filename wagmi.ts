import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, chain } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";

const { chains, provider, webSocketProvider } = configureChains(
	[chain.polygonMumbai],
	[alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY || "" })]
);

const { connectors } = getDefaultWallets({
	appName: "0xClans",
	chains,
});

export const client = createClient({
	autoConnect: true,
	connectors,
	provider,
	webSocketProvider,
});

export { chains, configureChains, createClient };
