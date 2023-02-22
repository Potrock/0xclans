import { gql } from "@apollo/client";
import { z } from "zod";
import client from "./apollo-client";
import {
	ClanCountResult,
	ClanCountResultType,
	GetAnalyticsResult,
	GetAnalyticsResultType,
	GetClanResult,
	GetClanResultType,
	GetClansResults,
	GetClansResultsType,
} from "./types";

export const getNumberOfClans = async (): Promise<ClanCountResultType> => {
	const { data } = await client.query({
		query: gql`
			{
				clanFactory(id: "0x7372d48Fb9A1c52AA7E6D99c1C84Cc47D294196A") {
					clanCount
				}
			}
		`,
	});

	return ClanCountResult.parse(data);
};

export const getClan = async (
	clanAddress: string
): Promise<GetClanResultType> => {
	const { data } = await client.query({
		query: gql`
            {
                clan(id: "${clanAddress}") {
                    id
                    name
                    symbol
                    members {
                        id
                    }
                }
            }`,
	});

	return GetClanResult.parse(data.clan);
};

export const getClans = async (): Promise<GetClansResultsType> => {
	const { data } = await client.query({
		query: gql`
			{
				clans {
					id
					name
					symbol
					members {
						id
					}
				}
			}
		`,
	});

	return GetClansResults.parse(data.clans);
};

export const getAnalytics = async (): Promise<GetAnalyticsResultType> => {
	const { data } = await client.query({
		query: gql`
			{
				userFactory(id: "1") {
					userCount
					accountCount
				}
				clanFactory(id: "0x7372d48Fb9A1c52AA7E6D99c1C84Cc47D294196A") {
					clanCount
				}
			}
		`,
	});

	return GetAnalyticsResult.parse(data);
};
