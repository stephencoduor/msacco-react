import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LoginForm } from '../components/login-form';
import { WarningDialog } from '../components/warning-dialog';
import { useAuthStore } from '@/stores/auth-store';

export function LoginPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Show warning after successful login (handled by auth store subscription)
  useEffect(() => {
    const unsub = useAuthStore.subscribe((state, prevState) => {
      if (state.isAuthenticated && !prevState.isAuthenticated) {
        const hasSeenWarning = sessionStorage.getItem('msacco-warning-shown');
        if (!hasSeenWarning) {
          setShowWarning(true);
          sessionStorage.setItem('msacco-warning-shown', 'true');
        }
      }
    });
    return unsub;
  }, []);

  if (isAuthenticated) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-msacco-page-bg p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="items-center pb-2">
          <img
            src="/assets/images/msacco-logo.svg"
            alt="M-Sacco"
            className="h-10 text-msacco-navy"
          />
          <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>

      <WarningDialog open={showWarning} onClose={() => setShowWarning(false)} />
    </div>
  );
}
