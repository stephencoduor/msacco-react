import { env } from './env';
import { useAuthStore } from '@/stores/auth-store';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

function buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
  const url = new URL(`${env.serverUrl}${path}`, window.location.origin);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

export async function api<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;
  const credentials = useAuthStore.getState().credentials;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Fineract-Platform-TenantId': env.tenantId,
    ...(options.headers as Record<string, string>),
  };

  if (credentials?.base64EncodedAuthenticationKey) {
    headers['Authorization'] = `Basic ${credentials.base64EncodedAuthenticationKey}`;
  }

  const response = await fetch(buildUrl(path, params), {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.defaultUserMessage || error.message || `API Error: ${response.status}`);
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}
