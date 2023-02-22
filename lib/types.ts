import { z } from "zod";

export const ClanCountResult = z.object({
	clanFactory: z.object({
		clanCount: z.number(),
	}),
});

export type ClanCountResultType = z.infer<typeof ClanCountResult>;

export const GetClanResult = z.object({
	id: z.string(),
	name: z.string(),
	symbol: z.string(),
	members: z.array(
		z.object({
			id: z.string(),
		})
	),
});

export type GetClanResultType = z.infer<typeof GetClanResult>;

export const GetClansResults = z.array(GetClanResult);

export type GetClansResultsType = z.infer<typeof GetClansResults>;
