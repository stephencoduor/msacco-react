import { useQuery } from '@tanstack/react-query';
import { getDashboardStats, getRecentClients, getRecentGroups } from '../api/dashboard-api';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: getDashboardStats,
    staleTime: 60 * 1000,
  });
}

export function useRecentClients() {
  return useQuery({
    queryKey: ['dashboard', 'recent-clients'],
    queryFn: getRecentClients,
    staleTime: 60 * 1000,
  });
}

export function useRecentGroups() {
  return useQuery({
    queryKey: ['dashboard', 'recent-groups'],
    queryFn: getRecentGroups,
    staleTime: 60 * 1000,
  });
}
