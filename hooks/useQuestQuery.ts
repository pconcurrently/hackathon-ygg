import { fetchQuest } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

const useQuestQuery = (slug: string, delay?: number) => {
	return useQuery({
		queryKey: ['quest', slug],
		queryFn: () => fetchQuest(slug, delay),
	});
};

export default useQuestQuery;
