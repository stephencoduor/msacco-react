import { useQuery } from '@tanstack/react-query';
import { getGroups } from '../api/groups-api';

interface UseGroupsSearchParams {
  name?: string;
  status?: string;
  page?: number;
  size?: number;
}

export function useGroupsSearch(params: UseGroupsSearchParams) {
  const { page = 0, size = 15, status, name } = params;

  return useQuery({
    queryKey: ['groups', { name, status, page, size }],
    queryFn: () =>
      getGroups({
        offset: page * size,
        limit: size,
        status,
        name: name || undefined,
        orderBy: 'name',
        sortOrder: 'ASC',
      }),
  });
}
