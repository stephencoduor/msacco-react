import { env } from '@/config/env';
import type { Credentials } from '@/types/credentials';

export async function authenticate(username: string, password: string): Promise<Credentials> {
  const response = await fetch(`${env.serverUrl}/authentication`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Fineract-Platform-TenantId': env.tenantId,
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Authentication failed' }));
    throw new Error(error.defaultUserMessage || error.errors?.[0]?.defaultUserMessage || 'Invalid username or password');
  }

  return response.json();
}
