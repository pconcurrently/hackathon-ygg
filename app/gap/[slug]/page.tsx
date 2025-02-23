import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/utils/getQueryClient';
import { fetchQuest, fetchQuestManager } from '@/utils/api';
import { Suspense } from 'react';
import QuestClient from '@/components/QuestClient';
import QuestManager from '@/components/QuestManager';
import QuestManagerClient from '@/components/QuestManagerClient';
// import useQuestQuery from '@/hooks/useQuestQuery';

export const experimental_ppr = true;

const paths = [
	'strength-in-numbers-596',
	'the-opening-move-588',
	'ranked-rookie-589',
];

export async function generateStaticParams() {
	return paths.map((path) => ({
		slug: path,
	}));
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const id = slug.split('-').pop() || '';

	const queryClient = getQueryClient();

	// queryClient.prefetchQuery({
	// 	queryKey: ['quest', id, slug],
	// 	queryFn: () => fetchQuest(id, slug),
	// });

	queryClient.prefetchQuery({
		queryKey: ['questManagers'],
		queryFn: () => fetchQuestManager('606'),
	});

	const quest = await queryClient.fetchQuery({
		queryKey: ['quest', id, slug],
		queryFn: () => fetchQuest(id, slug),
	});

	return (
		<>
			{/* <Quest slug={slug} id={id} /> */}
			<QuestClient quest={quest} />
			<HydrationBoundary state={dehydrate(queryClient)}>
				<Suspense fallback={<div>Loading...</div>}>
					<QuestManager />
				</Suspense>
			</HydrationBoundary>
			<QuestManagerClient />
		</>
	);
}
