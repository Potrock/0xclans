import { getClan, isClanAddress } from "@/lib/graph";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const query = req.query;
	const clanAddress = query.clanAddress;

	if (!clanAddress) {
		res.status(400).json({ error: "No clan address provided" });
		return;
	}

	const clan = await isClanAddress(clanAddress as string);

	if (clan) {
		res.status(200).json({ exists: true });
		return;
	} else {
		res.status(400).json({ exists: false });
		return;
	}
}
