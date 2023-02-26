import Image from "next/image";
import blockie from "assets/blockie.png";

export default function ProfilePicture({ address, url }: { address: string, url: string | null }) {
	// const { data, isLoading } = useEnsAvatar({
	// 	address: address as `0x${string}`,
	// });

	return (
		<div className="my-4">
			<Image
				className="w-32 h-32 mx-auto rounded-full"
				src={url || blockie}
				alt="Profile Picture"
			/>
		</div>
	);
}
