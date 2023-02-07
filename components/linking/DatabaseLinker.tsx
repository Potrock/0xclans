import { Button } from "flowbite-react";
import { useRouter } from "next/router";

type DatabaseLinkerProps = {
	platformName: string;
};

export const DatabaseLinker = ({ platformName }: DatabaseLinkerProps) => {
	const router = useRouter();
	const linkToOAuth = async () => {
		router.push("/api/auth/" + platformName.toLowerCase() + "/login");
	};

	return (
		<div>
			<Button className="px-2" onClick={linkToOAuth}>
				Sign in with {platformName}
			</Button>
		</div>
	);
};
