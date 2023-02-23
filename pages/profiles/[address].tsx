import Clans from "@/components/profile/Clans";
import LinkedAccounts from "@/components/profile/LinkedAccounts";
import ProfilePicture from "@/components/profile/ProfilePicture";
import WalletInfo from "@/components/profile/WalletInfo";
import { getUserProfile } from "@/lib/graph";
import { UserProfileResultType } from "@/lib/types";
import { truncateAddress } from "@/utils/helpers";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function ProfilePage({
	userProfile,
}: {
	userProfile: UserProfileResultType;
}) {
	return (
		<div className="p-4 max-w-7xl max-auto">
			<div className="grid grid-cols-5 gap-4">
				<div className="col-span-2">
					<ProfilePicture address={userProfile.user.id} />
					<button
						className="w-full"
						onClick={() => {
							navigator.clipboard.writeText(userProfile.user.id);
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

		const userProfile: UserProfileResultType = await getUserProfile(
			userAddress
		);

		if (userProfile) {
			return {
				props: {
					userProfile: userProfile,
				},
			};
		}
	}

	return {
		props: {},
	};
};
