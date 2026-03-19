import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createClient,
  updateClient,
  executeClientCommand,
  addClientIdentifier,
  addFamilyMember,
  uploadDocument,
  createNote,
} from '../api/clients-api';

export function useCreateClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => createClient(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['clients'] }),
  });
}

export function useUpdateClient(clientId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => updateClient(clientId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['client', clientId] }),
  });
}

export function useClientCommand(clientId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ command, data }: { command: string; data?: Record<string, unknown> }) =>
      executeClientCommand(clientId, command, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['client', clientId] }),
  });
}

export function useAddIdentifier(clientId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => addClientIdentifier(clientId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['client', clientId, 'identifiers'] }),
  });
}

export function useAddFamilyMember(clientId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => addFamilyMember(clientId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['client', clientId, 'family'] }),
  });
}

export function useUploadDocument(clientId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => uploadDocument(clientId, formData),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['client', clientId, 'documents'] }),
  });
}

export function useCreateNote(clientId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (note: string) => createNote(clientId, note),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['client', clientId, 'notes'] }),
  });
}
