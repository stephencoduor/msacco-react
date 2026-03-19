import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createGroup,
  updateGroup,
  executeGroupCommand,
  addGroupMembers,
  removeGroupMembers,
  createGroupNote,
} from '../api/groups-api';

export function useCreateGroup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => createGroup(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['groups'] }),
  });
}

export function useUpdateGroup(groupId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => updateGroup(groupId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['group', groupId] }),
  });
}

export function useGroupCommand(groupId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ command, data }: { command: string; data?: Record<string, unknown> }) =>
      executeGroupCommand(groupId, command, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['group', groupId] }),
  });
}

export function useAddGroupMembers(groupId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (clientIds: number[]) => addGroupMembers(groupId, clientIds),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['group', groupId] }),
  });
}

export function useRemoveGroupMembers(groupId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (clientIds: number[]) => removeGroupMembers(groupId, clientIds),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['group', groupId] }),
  });
}

export function useCreateGroupNote(groupId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (note: string) => createGroupNote(groupId, note),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['group', groupId, 'notes'] }),
  });
}
