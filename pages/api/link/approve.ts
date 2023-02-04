import { getUserLinkedAccounts } from "@/lib/db/utils";
import { authorizeLink, decodeSignature } from "@/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const query = req.query;
		const { sig, platform } = query;

		if (!(sig && platform)) {
			res.status(400).json({ error: "Missing parameters" });
			return;
		}

		const session = await getSession({ req });
		if (!session?.user.id) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		const address = decodeSignature(
			sig as string,
			session?.user.id as string
		);
		if (!address) {
			res.status(400).json({ error: "Invalid signature" });
		}

		const dbLinks = await getUserLinkedAccounts(session?.user.id || "");
		if (platform == "minecraft") {
			if (!dbLinks.minecraft) {
				res.status(400).json({ error: "Not connected" });
				return;
			}

			const sig = authorizeLink(address, dbLinks.minecraft, platform);
			if (sig) {
				res.status(200).json({ signature: sig });
			} else {
				res.status(400).json({ error: "Invalid signature" });
			}
		} else if (platform == "steam") {
			if (!dbLinks.steam) {
				res.status(400).json({ error: "Not connected" });
				return;
			}

			const sig = authorizeLink(address, dbLinks.steam, platform);
			if (sig) {
				res.status(200).json({ signature: sig });
			} else {
				res.status(400).json({ error: "Invalid signature" });
			}
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
