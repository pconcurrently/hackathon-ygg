import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/utils/getQueryClient';
import { fetchQuest } from '@/utils/api';
import Quest from '@/components/Quest';
import { Suspense } from 'react';
import RandomClientComponent from '@/components/RandomClientComponent';

export const experimental_ppr = true;

export default async function Page({
	params,
}: {
	params: Promise<{ slug: Array<string>; id: string }>;
}) {
	const slugArray = (await params).slug;
	const idProps = (await params).id;
	console.log({ idProps });
	const slug = slugArray.join('/');
	const id = slugArray[slugArray.length - 1].split('-').pop() || '';

	const queryClient = getQueryClient();

	queryClient.prefetchQuery({
		queryKey: ['quest', id, slug],
		queryFn: () => fetchQuest(id, slug),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Suspense fallback={<div>Loading...</div>}>
				<Quest slug={slug} id={id} />
			</Suspense>
			<RandomClientComponent />
		</HydrationBoundary>
	);
}
