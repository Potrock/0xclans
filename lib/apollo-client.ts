import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: "https://api.studio.thegraph.com/query/42642/0xclans/v0.0.96",
	cache: new InMemoryCache(),
});

export default client;
