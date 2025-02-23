'use client';

import useQuestManagerQuery from '@/hooks/useQuestManagerQuery';

const QuestManagerClient = () => {
	const { data } = useQuestManagerQuery('607');
	return (
		<div>
			<h2 className="text-2xl font-bold">Quest Manager from Client</h2>
			{data ? (
				<pre>{JSON.stringify(data, null, 2)}</pre>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
};

export default QuestManagerClient;
