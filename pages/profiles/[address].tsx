import { Button } from "@/components/elements/Button";
import Clans from "@/components/profile/Clans";
import LinkedAccounts from "@/components/profile/LinkedAccounts";
import ProfilePicture from "@/components/profile/ProfilePicture";
import WalletInfo from "@/components/profile/WalletInfo";
import { getUserProfile } from "@/lib/graph";
import { UserProfileResultType } from "@/lib/types";
import { truncateAddress } from "@/utils/helpers";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";

export default function ProfilePage({
	profile,
	userProfile,
}: {
	profile: boolean;
	userProfile?: UserProfileResultType;
}) {
	if (profile && userProfile) {
		return (
			<div className="p-4 max-w-7xl max-auto">
				<div className="grid grid-cols-5 gap-4">
					<div className="col-span-2">
						<ProfilePicture
							address={userProfile.user.id}
							url={null}
						/>
						<button
							className="w-full"
							onClick={() => {
								navigator.clipboard.writeText(
									userProfile.user.id
								);
							}}
						>
							<WalletInfo
								address={truncateAddress(userProfile.user.id)}
							/>
						</button>
					</div>
					<div className="col-span-3">
						<Clans clans={userProfile.user.clans} />
						<LinkedAccounts accounts={userProfile.user.accounts} />
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="flex items-center justify-center flex-auto h-full text-center">
				<div>
					<h1 className="text-4xl font-bold text-white">
						Profile not found
					</h1>
					<p className="pt-4 pb-4">
						Search for a profile using their wallet address
					</p>
					<Link href="/">
						<Button>
							<span className="text-lg">Home</span>
						</Button>
					</Link>
				</div>
			</div>
		);
	}
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
					destination: "/",
					permanent: false,
				},
			};
		}

		let userAddress = params.address as string;

		const userProfile: UserProfileResultType | null = await getUserProfile(
			userAddress
		);

		if (userProfile) {
			return {
				props: {
					profile: true,
					userProfile: userProfile,
				},
			};
		}
	}

	return {
		props: {
			profile: false,
		},
	};
};
