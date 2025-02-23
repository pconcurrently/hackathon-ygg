'use client';

import { fetchQuestManager } from '@/utils/api';
import { useSuspenseQuery } from '@tanstack/react-query';

const QuestManager = () => {
	const { data } = useSuspenseQuery({
		queryKey: ['questManager'],
		queryFn: () => fetchQuestManager('606'),
	});
	return (
		<div>
			<h2 className="text-2xl font-bold">Quest Manager from Server</h2>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};

export default QuestManager;
