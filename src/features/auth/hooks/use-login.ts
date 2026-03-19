import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authenticate } from '../api/auth-api';
import { useAuthStore } from '@/stores/auth-store';

export function useLogin() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      authenticate(username, password),
    onSuccess: (credentials) => {
      login(credentials);
      navigate('/home');
    },
  });
}
