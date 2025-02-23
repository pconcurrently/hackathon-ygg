import { fetchQuestManager } from '@/utils/api';
import { Suspense } from 'react';
import { getQueryClient } from '@/utils/getQueryClient';

const QuestManager = async ({ id }: { id: string }) => {
	const queryClient = getQueryClient();
	const data = await queryClient.fetchQuery({
		queryKey: ['questManager'],
		queryFn: () => fetchQuestManager(id),
	});
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<h2 className="text-2xl font-bold">Quest Manager from Server</h2>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</Suspense>
	);
};

export default QuestManager;
