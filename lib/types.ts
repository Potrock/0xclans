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

export const GetAnalyticsResult = z.object({
	userFactory: z.object({
		userCount: z.number(),
		accountCount: z.number(),
	}),
	clanFactory: z.object({
		clanCount: z.number(),
	}),
});

export type GetAnalyticsResultType = z.infer<typeof GetAnalyticsResult>;

export const UserProfileResult = z.object({
	user: z.object({
		accounts: z.array(
			z.object({
				platform: z.string(),
				uuid: z.string(),
			})
		),
		clans: z.array(
			z.object({
				id: z.string(),
				name: z.string(),
				symbol: z.string(),
			})
		),
		id: z.string(),
	}),
});

export type UserProfileResultType = z.infer<typeof UserProfileResult>;
