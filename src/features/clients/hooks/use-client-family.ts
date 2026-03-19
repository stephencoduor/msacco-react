import { useQuery } from '@tanstack/react-query';
import { getClientFamilyMembers } from '../api/clients-api';

export function useClientFamily(clientId: number) {
  return useQuery({
    queryKey: ['client', clientId, 'family'],
    queryFn: () => getClientFamilyMembers(clientId),
    enabled: !!clientId,
  });
}
