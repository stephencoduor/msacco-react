import { useQuery } from '@tanstack/react-query';
import { getClientNotes } from '../api/clients-api';

export function useClientNotes(clientId: number) {
  return useQuery({
    queryKey: ['client', clientId, 'notes'],
    queryFn: () => getClientNotes(clientId),
    enabled: !!clientId,
  });
}
