import { useQuery } from '@tanstack/react-query';
import { getClientIdentifiers } from '../api/clients-api';

export function useClientIdentifiers(clientId: number) {
  return useQuery({
    queryKey: ['client', clientId, 'identifiers'],
    queryFn: () => getClientIdentifiers(clientId),
    enabled: !!clientId,
  });
}
