import { Button } from "components/elements/Button";
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
			<Button onClick={linkToOAuth}>Sign in with {platformName}</Button>
		</div>
	);
};
