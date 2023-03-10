import { connectWalletToUser } from "@/lib/db/utils";
import { decodeSignature } from "@/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });
	if (session && session.user && session.user.id) {
		//DEBUG

		const query = req.query;
		const { signedMsg } = query;
		const address = decodeSignature(signedMsg as string, session.user.id);

		if (!address) {
			res.status(400).json({ error: "Invalid signature" });
			return;
		}

		if (address !== query.wallet) {
			res.status(400).json({ error: "Address mismatch" });
			return;
		}

		const wallet = await connectWalletToUser(address, session.user.id);
		if (wallet) {
			//Success
			res.status(200).json({ success: true });
		}
	} else {
		res.status(401).json({ error: "Unauthorized" });
	}
}
