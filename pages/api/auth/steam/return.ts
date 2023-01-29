import getHandler from "@/lib/router";

const path = "api/auth/steam/return";

interface AuthReturnResponse extends Response {
	redirect: (path: string) => any;
	end: () => any;
}

export default getHandler().get(
	path,
	async (req: any, res: AuthReturnResponse) => {
		let idLink = req.query["openid.claimed_id"];
		if (!idLink) {
			res.redirect("/");
		}
		let id = idLink.split("https://steamcommunity.com/openid/id/")[1];
		if (!id) {
			res.redirect("/");
		}
		req.session.steamId = id;
		await req.session.save();
		res.redirect("/?success=1");
	}
);
