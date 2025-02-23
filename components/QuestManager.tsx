import { fetchQuestManager } from '@/utils/api';
import { getQueryClient } from '@/utils/getQueryClient';
import { cookies } from 'next/headers';

const QuestManager = async ({ id }: { id: string }) => {
	const queryClient = getQueryClient();
	const session = (await cookies()).get('session')?.value;
	const data = await queryClient.fetchQuery({
		queryKey: ['questManager'],
		queryFn: () => fetchQuestManager(id),
	});
	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<pre>{JSON.stringify(session, null, 2)}</pre>
		</div>
	);
};

export default QuestManager;
