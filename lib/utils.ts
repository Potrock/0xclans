import Web3 from "web3";

export async function getMinecraftInfoFromAccessToken(accessToken: string) {
	let rpsTicket = "d=" + accessToken;
	let xblObj = {
		RelyingParty: "http://auth.xboxlive.com",
		TokenType: "JWT",
		Properties: {
			AuthMethod: "RPS",
			SiteName: "user.auth.xboxlive.com",
			RpsTicket: rpsTicket,
		},
	};
	let xbl = await fetch("https://user.auth.xboxlive.com/user/authenticate", {
		method: "POST",
		body: JSON.stringify(xblObj),
		headers: {
			"Content-Type": "application/json",
			"X-Xbl-Contract-Version": "2",
		},
	}).then((res) => res.json());

	let xsts = await fetch("https://xsts.auth.xboxlive.com/xsts/authorize", {
		method: "POST",
		body: JSON.stringify({
			RelyingParty: "rp://api.minecraftservices.com/",
			TokenType: "JWT",
			Properties: {
				SandboxId: "RETAIL",
				UserTokens: [xbl.Token],
			},
		}),
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	}).then((res) => res.json());

	let minecraftObj = {
		identityToken:
			"XBL3.0 x=" + xsts.DisplayClaims.xui[0].uhs + ";" + xsts.Token,
	};

	let minecraft = await fetch(
		"https://api.minecraftservices.com/authentication/login_with_xbox",
		{
			method: "POST",
			body: JSON.stringify(minecraftObj),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}
	).then((res) => res.json());

	let profile = await fetch(
		"https://api.minecraftservices.com/minecraft/profile",
		{
			method: "GET",
			headers: {
				Authorization: "Bearer " + minecraft.access_token,
			},
		}
	).then((res) => res.json());

	return {
		username: profile.name,
		uuid: profile.id,
	};
}

export function getSteamIDFromURL(url: string) {
	return url.split("https://steamcommunity.com/openid/id/")[1];
}

export function decodeSignature(signature: string, text: string) {
	let web3 = new Web3(
		new Web3.providers.HttpProvider(process.env.ALCHEMY_RPC_URL || "")
	);

	let address = web3.eth.accounts.recover(
		"Sign this message to link your wallet to your 0xClans account: \n" +
			text,
		signature
	);

	return address;
}

export function authorizeLink(address: string, uuid: string, platform: string) {
	let web3 = new Web3(
		new Web3.providers.HttpProvider(process.env.ALCHEMY_RPC_URL || "")
	);

	let message = web3.utils.keccak256(
		web3.eth.abi.encodeParameters(
			["address", "string", "string"],
			[address, uuid, platform]
		)
	);
	let signature = web3.eth.accounts.sign(
		message,
		process.env.SIGNER_PK || ""
	);

	return signature.signature;
}
