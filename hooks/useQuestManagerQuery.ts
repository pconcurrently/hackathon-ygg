import { fetchQuestManager } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

const useQuestManagersQuery = (id: string) => {
	return useQuery({
		queryKey: ['questManagers', id],
		queryFn: () => fetchQuestManager(id),
	});
};

export default useQuestManagersQuery;
