import { fetchQuestManager } from '@/utils/api';
import { getQueryClient } from '@/utils/getQueryClient';
import { cookies } from 'next/headers';
import Counter from './Counter';

const QuestManager = async ({ id, no }: { id: string; no: number }) => {
	const queryClient = getQueryClient();
	const session = (await cookies()).get('session')?.value;
	const data = await queryClient.fetchQuery({
		queryKey: ['questManager', no],
		queryFn: () => fetchQuestManager(id, no * 1000),
	});
	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<pre>{JSON.stringify(session, null, 2)}</pre>
			<Counter />
		</div>
	);
};

export default QuestManager;
