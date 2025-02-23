import { graphqlRequest } from '@/utils/graphql';
import { GET_QUEST } from '@/graphql/queries';
import type { Quest } from '@/graphql/queries';

interface QuestQueryResponse {
	quest: Quest;
}

export async function fetchQuest(
	id: string,
	slug: string,
	delay?: number
): Promise<Quest> {
	console.log({ id, slug });
	const response = await graphqlRequest<QuestQueryResponse>({
		query: GET_QUEST,
		variables: { id, slug },
	});

	// Delay for 3 seconds before returning the result
	await new Promise((resolve) => setTimeout(resolve, delay || 3000));

	return response.quest;
}
