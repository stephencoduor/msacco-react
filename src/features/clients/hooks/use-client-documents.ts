import { useQuery } from '@tanstack/react-query';
import { getClientDocuments } from '../api/clients-api';

export function useClientDocuments(clientId: number) {
  return useQuery({
    queryKey: ['client', clientId, 'documents'],
    queryFn: () => getClientDocuments(clientId),
    enabled: !!clientId,
  });
}
