import { api } from '@/config/api';
import type {
  ClientDetail,
  ClientIdentifier,
  FamilyMember,
  ClientDocument,
  ClientNote,
  ClientSearchResponse,
} from '@/types/client';

export function searchClients(searchText: string, _page = 0, _size = 15) {
  return api<ClientSearchResponse>('/search', {
    params: {
      query: searchText,
      resource: 'clients',
      exactMatch: false,
    },
  }).then((result) => {
    // Fineract search endpoint returns different structure
    // Normalize to our expected format
    return result;
  });
}

export function searchClientsV2(searchText: string, page = 0, size = 15) {
  return api<ClientSearchResponse>('/v2/clients/search', {
    method: 'POST',
    body: JSON.stringify({
      searchText,
      exactMatch: false,
      page,
      size,
    }),
  });
}

export function getClients(params: {
  offset?: number;
  limit?: number;
  orderBy?: string;
  sortOrder?: string;
  status?: string;
  displayName?: string;
  accountNo?: string;
  externalId?: string;
  orphansOnly?: boolean;
}) {
  return api<ClientSearchResponse>('/clients', {
    params: {
      ...params,
      paged: true,
      offset: params.offset ?? 0,
      limit: params.limit ?? 15,
    },
  });
}

export function getClient(id: number) {
  return api<ClientDetail>(`/clients/${id}`);
}

export function getClientIdentifiers(clientId: number) {
  return api<ClientIdentifier[]>(`/clients/${clientId}/identifiers`);
}

export function getClientFamilyMembers(clientId: number) {
  return api<{ familyMembers?: FamilyMember[] }>(`/clients/${clientId}/familymembers`).then(
    (res) => ('familyMembers' in res ? res.familyMembers : res) as FamilyMember[]
  );
}

export function getClientDocuments(clientId: number) {
  return api<ClientDocument[]>(`/clients/${clientId}/documents`);
}

export function getClientNotes(clientId: number) {
  return api<ClientNote[]>(`/clients/${clientId}/notes`).then((res) =>
    Array.isArray(res) ? res : (res as { pageItems?: ClientNote[] }).pageItems ?? []
  );
}

// Mutations
export function createClient(data: Record<string, unknown>) {
  return api<{ clientId: number; resourceId: number }>('/clients', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateClient(id: number, data: Record<string, unknown>) {
  return api<{ clientId: number }>(`/clients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function executeClientCommand(id: number, command: string, data: Record<string, unknown> = {}) {
  return api<{ clientId: number }>(`/clients/${id}`, {
    method: 'POST',
    params: { command },
    body: JSON.stringify(data),
  });
}

export function addClientIdentifier(clientId: number, data: Record<string, unknown>) {
  return api<{ resourceId: number }>(`/clients/${clientId}/identifiers`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function addFamilyMember(clientId: number, data: Record<string, unknown>) {
  return api<{ resourceId: number }>(`/clients/${clientId}/familymembers`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function uploadDocument(clientId: number, formData: FormData) {
  return api<{ resourceId: number }>(`/clients/${clientId}/documents`, {
    method: 'POST',
    body: formData,
    headers: {} as Record<string, string>, // Let browser set Content-Type for multipart
  });
}

export function createNote(clientId: number, note: string) {
  return api<{ resourceId: number }>(`/clients/${clientId}/notes`, {
    method: 'POST',
    body: JSON.stringify({ note }),
  });
}
