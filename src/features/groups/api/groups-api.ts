import { api } from '@/config/api';
import type {
  GroupDetail,
  GroupSearchResponse,
  GroupNote,
} from '@/types/group';

export function getGroups(params: {
  offset?: number;
  limit?: number;
  orderBy?: string;
  sortOrder?: string;
  name?: string;
  status?: string;
  orphansOnly?: boolean;
}) {
  return api<GroupSearchResponse>('/groups', {
    params: {
      ...params,
      paged: true,
      offset: params.offset ?? 0,
      limit: params.limit ?? 15,
    },
  });
}

export function getGroup(id: number) {
  return api<GroupDetail>(`/groups/${id}`, {
    params: { associations: 'all' },
  });
}

export function getGroupAccounts(groupId: number) {
  return api<{
    savingsAccounts?: Array<{ id: number; accountNo: string; productName: string; status: { value: string } }>;
    loanAccounts?: Array<{ id: number; accountNo: string; productName: string; status: { value: string } }>;
  }>(`/groups/${groupId}/accounts`);
}

export function getGroupNotes(groupId: number) {
  return api<GroupNote[]>(`/groups/${groupId}/notes`).then((res) =>
    Array.isArray(res) ? res : (res as { pageItems?: GroupNote[] }).pageItems ?? []
  );
}

export function createGroup(data: Record<string, unknown>) {
  return api<{ groupId: number; resourceId: number }>('/groups', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateGroup(id: number, data: Record<string, unknown>) {
  return api<{ groupId: number }>(`/groups/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function executeGroupCommand(id: number, command: string, data: Record<string, unknown> = {}) {
  return api<{ groupId: number }>(`/groups/${id}`, {
    method: 'POST',
    params: { command },
    body: JSON.stringify(data),
  });
}

export function addGroupMembers(groupId: number, clientMembers: number[]) {
  return api<{ groupId: number }>(`/groups/${groupId}`, {
    method: 'POST',
    params: { command: 'associateClients' },
    body: JSON.stringify({ clientMembers }),
  });
}

export function removeGroupMembers(groupId: number, clientMembers: number[]) {
  return api<{ groupId: number }>(`/groups/${groupId}`, {
    method: 'POST',
    params: { command: 'disassociateClients' },
    body: JSON.stringify({ clientMembers }),
  });
}

export function createGroupNote(groupId: number, note: string) {
  return api<{ resourceId: number }>(`/groups/${groupId}/notes`, {
    method: 'POST',
    body: JSON.stringify({ note }),
  });
}
