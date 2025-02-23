import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/utils/getQueryClient';
import { fetchQuestManager } from '@/utils/api';
import { Suspense } from 'react';
import QuestClient from '@/components/QuestClient';
import QuestManager from '@/components/QuestManager';
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
		queryKey: ['questManagers', 2],
		queryFn: () => fetchQuestManager(id, 2000),
	});

	queryClient.prefetchQuery({
		queryKey: ['questManagers', 5],
		queryFn: () => fetchQuestManager(id, 5000),
	});

	return (
		<>
			{/* <Quest slug={slug} id={id} /> */}
			<QuestClient slug={slug} />
			<HydrationBoundary state={dehydrate(queryClient)}>
				<div className="flex flex-col p-4 gap-4">
					<Suspense fallback={<div>Loading...</div>}>
						<QuestManager id={id} no={2} />
					</Suspense>
					<Suspense fallback={<div>Loading...</div>}>
						<QuestManager id={id} no={5} />
					</Suspense>
				</div>
			</HydrationBoundary>
		</>
	);
}
