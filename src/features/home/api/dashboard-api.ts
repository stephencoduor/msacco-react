import { api } from '@/config/api';

export interface DashboardStats {
  clients: { total: number };
  groups: { total: number };
  loans: { total: number; pending: number };
  savings: { total: number };
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [clients, groups] = await Promise.all([
    api<{ totalFilteredRecords: number }>('/clients', { params: { paged: true, limit: 1, offset: 0 } }),
    api<{ totalFilteredRecords: number }>('/groups', { params: { paged: true, limit: 1, offset: 0 } }),
  ]);

  return {
    clients: { total: clients.totalFilteredRecords },
    groups: { total: groups.totalFilteredRecords },
    loans: { total: 0, pending: 0 },
    savings: { total: 0 },
  };
}

export function getRecentClients() {
  return api<{ pageItems: Array<{ id: number; accountNo: string; displayName: string; officeName: string; status: { value: string } }> }>(
    '/clients',
    { params: { paged: true, limit: 5, offset: 0, orderBy: 'id', sortOrder: 'DESC' } }
  ).then((r) => r.pageItems);
}

export function getRecentGroups() {
  return api<{ pageItems: Array<{ id: number; accountNo: string; name: string; officeName: string; status: { value: string } }> }>(
    '/groups',
    { params: { paged: true, limit: 5, offset: 0, orderBy: 'id', sortOrder: 'DESC' } }
  ).then((r) => r.pageItems);
}
