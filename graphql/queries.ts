import { gql } from '@apollo/client';

export const GET_QUEST = gql`
	query Quest($id: ID!, $slug: ID!) {
		quest(filter: { id: $id, slug: $slug }) {
			id
			strapiId
			slug
			questType
			title
			description
			urlPath
			premium
			enrollmentStart
			enrollmentEnd
			url
			submissionFormUrl
			section
			order
			numberOfGuildsEnrolled
			levels {
				id
				strapiId
				slug
				questType
				title
				description
				urlPath
				premium
				enrollmentStart
				enrollmentEnd
				url
				submissionFormUrl
				section
				order
				numberOfGuildsEnrolled
			}
			logo {
				id
				hash
				name
				url
			}
			questRewards {
				id
				strapiId
				awardQuantity
				rewardQuantityPool
				name
				claimingContractAddress
			}
		}
	}
`;

export const GET_QUEST_MANAGER = gql`
	query QuestManager($questIds: [ID!]!) {
		questManagers(filter: { questIds: $questIds }) {
			id
			displayName
		}
	}
`;

export interface Example {
	id: string;
	title: string;
}

export interface ExampleInput {
	someData: string;
}

export interface Quest {
	id: string;
	strapiId: string;
	slug: string;
	questType: string;
	title: string;
	description: string;
	urlPath: string;
	premium: boolean;
	enrollmentStart: string;
	enrollmentEnd: string;
	url: string;
	submissionFormUrl: string;
	section: string;
	order: number;
	numberOfGuildsEnrolled: number;
	levels: Level[];
	logo: Logo;
	questRewards: QuestReward[];
}

export type Level = Omit<Quest, 'levels' | 'logo' | 'questRewards'>;

export interface Logo {
	id: string;
	hash: string;
	name: string;
	url: string;
}

export interface QuestReward {
	id: string;
	strapiId: string;
	awardQuantity: number;
	rewardQuantityPool: number;
	name: string;
	claimingContractAddress: string;
}
