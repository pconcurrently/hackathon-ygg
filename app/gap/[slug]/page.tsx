import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/utils/getQueryClient';
import { fetchQuest } from '@/utils/api';
import Quest from '@/components/Quest';
import { Suspense } from 'react';
import RandomClientComponent from '@/components/RandomClientComponent';
// import useQuestQuery from '@/hooks/useQuestQuery';

export const experimental_ppr = true;

const paths = [
	{
		id: '606',
		slug: 'grimorian-novice-606',
	},
	{
		id: '608',
		slug: 'town-crier-608',
	},
	{
		id: '959',
		slug: 'sweet-sixteen-959',
	},
];

export async function generateStaticParams() {
	return paths.map((path) => ({
		slug: path.slug,
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

	const quest = await queryClient.fetchQuery({
		queryKey: ['quest', id, slug],
		queryFn: () => fetchQuest(id, slug),
	});

	queryClient.prefetchQuery({
		queryKey: ['quest', '111', 'hehehe'],
		queryFn: () => fetchQuest('606', 'grimorian-novice-606'),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Suspense fallback={<div>Loading...</div>}>
				<Quest slug={'grimorian-novice-606'} id={'606'} />
			</Suspense>
			<RandomClientComponent quest={quest} />
		</HydrationBoundary>
	);
}
