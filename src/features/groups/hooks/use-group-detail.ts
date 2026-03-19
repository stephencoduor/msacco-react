import { useQuery } from '@tanstack/react-query';
import { getGroup, getGroupAccounts, getGroupNotes } from '../api/groups-api';

export function useGroupDetail(groupId: number) {
  return useQuery({
    queryKey: ['group', groupId],
    queryFn: () => getGroup(groupId),
    enabled: !!groupId,
  });
}

export function useGroupAccounts(groupId: number) {
  return useQuery({
    queryKey: ['group', groupId, 'accounts'],
    queryFn: () => getGroupAccounts(groupId),
    enabled: !!groupId,
  });
}

export function useGroupNotes(groupId: number) {
  return useQuery({
    queryKey: ['group', groupId, 'notes'],
    queryFn: () => getGroupNotes(groupId),
    enabled: !!groupId,
  });
}
