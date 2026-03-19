import { useAuthStore } from '@/stores/auth-store';

export function usePermissions() {
  const credentials = useAuthStore((s) => s.credentials);
  const permissions = credentials?.permissions ?? [];

  const hasPermission = (permission: string): boolean => {
    return permissions.includes('ALL_FUNCTIONS') || permissions.includes(permission);
  };

  return { permissions, hasPermission };
}
