import { useQuery } from '@tanstack/react-query';
import { getClients } from '../api/clients-api';

interface UseClientsSearchParams {
  displayName?: string;
  accountNo?: string;
  externalId?: string;
  status?: string;
  page?: number;
  size?: number;
}

export function useClientsSearch(params: UseClientsSearchParams) {
  const { page = 0, size = 15, status, displayName, accountNo, externalId } = params;

  return useQuery({
    queryKey: ['clients', { displayName, accountNo, externalId, status, page, size }],
    queryFn: () =>
      getClients({
        offset: page * size,
        limit: size,
        status,
        displayName: displayName || undefined,
        accountNo: accountNo || undefined,
        externalId: externalId || undefined,
        orderBy: 'displayName',
        sortOrder: 'ASC',
      }),
  });
}
