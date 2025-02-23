import { fetchQuest } from '@/utils/api';
import { getQueryClient } from '@/utils/getQueryClient';
import Image from 'next/image';
import Counter from './Counter';

const QuestClient = async ({ slug }: { slug: string }) => {
	const queryClient = getQueryClient();
	const quest = await queryClient.fetchQuery({
		queryKey: ['quest', slug],
		queryFn: () => fetchQuest(slug, 0),
	});

	return (
		<div className="quest-details p-4 flex flex-col gap-4">
			<div className="flex flex-col items-center gap-4">
				<Image
					src={quest?.logo?.url ?? ''}
					alt={quest?.title ?? ''}
					width={150}
					height={150}
				/>
				<h2 className="text-xl font-bold">{quest?.title}</h2>
			</div>
			<div className="criteria bg-gray-800 p-4 rounded-md">
				<p className="text-gray-300">{quest?.description}</p>
			</div>
			<Counter />
		</div>
	);
};

export default QuestClient;
