import { useAuthStore } from '@/stores/auth-store';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const logout = useAuthStore((s) => s.logout);

  return (
    <footer className="mt-auto border-t border-msacco-border bg-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-4 px-4 py-3 text-sm text-msacco-text-muted">
        <button className="hover:text-msacco-navy transition-colors">Help</button>
        <Separator orientation="vertical" className="h-4" />
        <button className="hover:text-msacco-navy transition-colors">Support</button>
        <Separator orientation="vertical" className="h-4" />
        <button
          onClick={logout}
          className="hover:text-msacco-navy transition-colors"
        >
          Sign Out
        </button>
        <Separator orientation="vertical" className="h-4" />
        <span>&copy; M-Sacco 2026</span>
      </div>
    </footer>
  );
}
