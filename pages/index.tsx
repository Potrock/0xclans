import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Web3Button } from "@web3modal/react";
import {
	useAccount,
	useContractWrite,
	usePrepareContractWrite,
	useSignMessage,
} from "wagmi";
import { getUserLinkedAccounts } from "@/lib/db/utils";
import { useEffect, useState } from "react";
import AccountLinker from "../contracts/AccountLinker.json";

export default function Home(props: any) {
	const { data: session } = useSession();

	const router = useRouter();

	const [isDefinitelyConnected, setIsDefinitelyConnected] = useState(false);
	const { address, isConnected } = useAccount();
	const {
		data: signedMsg,
		isSuccess,
		signMessageAsync,
	} = useSignMessage({
		message:
			"Sign the following message so we can authenticate your wallet: \n" +
			session?.user.id,
	});

	const [authSignature, setAuthSignature] = useState<string>("");

	useEffect(() => {
		if (isConnected) {
			setIsDefinitelyConnected(true);
		} else {
			setIsDefinitelyConnected(false);
		}
	}, [address]);

	const steam = async () => {
		router.push("/api/auth/steam/login");
	};

	const azure = async () => {
		router.push("/api/auth/azure/login");
	};

	const seekAuth = async (signature: string, platform: string) => {
		const res = await fetch(
			"/api/link/approve?sig=" + signature + "&platform=" + platform
		);
		const data = await res.json();
		if (data) {
			if (data.signature) {
				return data.signature;
			}
		}
	};

	const { config } = usePrepareContractWrite({
		address: AccountLinker.address as `0x${string}`,
		abi: AccountLinker.abi,
		functionName: "linkPlayerToUuidByPlatform",
		args: [props.user.minecraft, "minecraft", authSignature],
		enabled: authSignature === "" ? false : true,
	});

	const {
		data,
		isLoading,
		isSuccess: linkSuccess,
		write,
	} = useContractWrite(config);

	const onClickContractLink = async () => {
		await signMessageAsync();
		if (isSuccess) {
			const authorizationSignature = await seekAuth(
				signedMsg as string,
				"minecraft"
			);
			if (authorizationSignature) {
				setAuthSignature(authorizationSignature);
				if (write) {
					write();
				}
			}
		}
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-4xl font-bold">0xClans</h1>
			<div className="flex flex-col">
				{session && <p>Welcome back, {session.user?.name}</p>}
				{!session && <button onClick={() => signIn()}>Sign in</button>}
			</div>
			{props.user && !props.user.steam && (
				<div>
					<button onClick={() => steam()} className="bg-blue-500">
						Sign in with Steam
					</button>
				</div>
			)}
			{props.user && props.user.steam && (
				<p>Connected to Steam ID: {props.user.steam}</p>
			)}
			{props.user && !props.user.minecraft && (
				<div>
					<button onClick={() => azure()} className="bg-blue-500">
						Sign in with Azure
					</button>
				</div>
			)}
			{props.user && props.user.minecraft && (
				<p>Connected to Minecraft ID: {props.user.minecraft}</p>
			)}
			<div>{isDefinitelyConnected && <p>Hello wrld!</p>}</div>
			<Web3Button />
			<button onClick={() => onClickContractLink()}>
				Link to contract
			</button>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
}: GetServerSidePropsContext) => {
	const session = await getSession({ req });
	if (session) {
		const userAccounts = await getUserLinkedAccounts(session.user.id);

		return {
			props: {
				session: session,
				user: userAccounts,
			},
		};
	}
	return {
		props: { session: null },
	};
};
