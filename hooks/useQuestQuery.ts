import { fetchQuest } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

const useQuestQuery = (id: string, slug: string, delay?: number) => {
	return useQuery({
		queryKey: ['quest', id, slug],
		queryFn: () => fetchQuest(id, slug, delay),
	});
};

export default useQuestQuery;
