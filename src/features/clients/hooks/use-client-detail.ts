import { useQuery } from '@tanstack/react-query';
import { getClient } from '../api/clients-api';

export function useClientDetail(clientId: number) {
  return useQuery({
    queryKey: ['client', clientId],
    queryFn: () => getClient(clientId),
    enabled: !!clientId,
  });
}
