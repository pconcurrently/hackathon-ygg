import { graphqlRequest } from '@/utils/graphql';
import { GET_QUEST, GET_QUEST_MANAGER } from '@/graphql/queries';
import type { Quest } from '@/graphql/queries';

interface QuestQueryResponse {
	quest: Quest;
}

interface QuestManagerQueryResponse {
	questManagers: {
		id: string;
		displayName: string;
	}[];
}

export async function fetchQuest(slug: string, delay?: number): Promise<Quest> {
	const id = slug.split('-').pop();
	const response = await graphqlRequest<QuestQueryResponse>({
		query: GET_QUEST,
		variables: { id, slug },
	});

	// Delay for 3 seconds before returning the result
	await new Promise((resolve) => setTimeout(resolve, delay || 3000));

	return response.quest;
}

export async function fetchQuestManager(id: string) {
	const response = await graphqlRequest<QuestManagerQueryResponse>({
		query: GET_QUEST_MANAGER,
		variables: { questIds: [id] },
	});

	await new Promise((resolve) => setTimeout(resolve, 3000));

	return response;
}
