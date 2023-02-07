import { getLinkApprovalSig } from "@/lib/db/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession, useSession } from "next-auth/react";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const query = req.query;
	const { platformName } = query;

	const session = await getSession({ req });

	if (session && session.user && platformName) {
		const approvalSig = await getLinkApprovalSig(
			session.user.id,
			platformName as string
		);
		if (!approvalSig) {
			res.status(400).json({ error: "Bad Request" });
			return;
		}
		res.status(200).json({ sig: approvalSig });
	} else {
		res.status(401).json({ error: "Unauthorized" });
	}
}
