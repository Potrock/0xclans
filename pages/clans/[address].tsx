import { getClan } from "@/lib/graph";
import { GetClanResultType } from "@/lib/types";
import { truncateAddress } from "@/utils/helpers";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";

export default function Clan({ name, symbol, members, id }: GetClanResultType) {
	return (
		<div className="w-9/12 mx-auto ">
			<h1 className="pt-6 text-xl font-bold">{name}</h1>
			<p>Symbol: {symbol}</p>
			<p>Member Count: {members.length}</p>
			<Link
				href={`https://mumbai.polygonscan.com/address/${id}`}
				target="_blank"
				rel="noreferrer"
			>
				Contract:{" "}
				<span className="text-blue-500">{truncateAddress(id)}</span>
			</Link>
			<div className="pt-2 pb-2 text-xl font-semibold">
				<p>Members</p>
			</div>
			{members.map((member) => {
				return (
					<div key={member.id}>
						<Link
							href={
								"https://mumbai.polygonscan.com/address/" +
								member.id
							}
						>
							<p className="text-blue-500">{member.id}</p>
						</Link>
					</div>
				);
			})}
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	params,
}: GetServerSidePropsContext) => {
	if (params) {
		if (!params.address) {
			return {
				redirect: {
					destination: "/clans",
					permanent: false,
				},
			};
		}

		let clanAddress = params.address as string;

		let clan = await getClan(clanAddress);

		if (clan) {
			return {
				props: {
					name: clan.name,
					symbol: clan.symbol,
					members: clan.members,
					id: clan.id,
				},
			};
		}
	}
	return {
		redirect: {
			destination: "/clans",
			permanent: false,
		},
	};
};
