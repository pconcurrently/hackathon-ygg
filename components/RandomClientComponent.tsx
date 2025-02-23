'use client';

import { Quest } from '@/graphql/queries';
// import useQuestQuery from '@/hooks/useQuestQuery';
import { Suspense } from 'react';

const RandomClientComponent = ({ quest }: { quest: Quest }) => {
	// const quest = useQuestQuery(
	// 	'606',
	// 	'gap/season-8/champions-tactics-563/grimorian-novice-606',
	// 	1000
	// );
	return (
		<div>
			<h2>Quest 2</h2>
			<Suspense fallback={<div>Loading...</div>}>
				<h1>{quest?.title}</h1>
			</Suspense>
		</div>
	);
};

export default RandomClientComponent;
