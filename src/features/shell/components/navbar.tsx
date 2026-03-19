import { Link, NavLink } from 'react-router';
import { Search, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { navItems } from '../constants/nav-items';
import { useAuthStore } from '@/stores/auth-store';
import { usePermissions } from '@/hooks/use-permissions';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onMenuToggle: () => void;
}

export function Navbar({ onMenuToggle }: NavbarProps) {
  const { credentials, logout } = useAuthStore();
  const { hasPermission } = usePermissions();
  const initials = credentials?.username?.slice(0, 2).toUpperCase() ?? 'U';

  return (
    <nav className="sticky top-0 z-50 bg-msacco-navy text-white shadow-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center px-4 gap-4">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 shrink-0">
          <img
            src="/assets/images/msacco-logo.svg"
            alt="M-Sacco"
            className="h-8 brightness-0 invert"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden min-[960px]:flex items-center gap-1 flex-1">
          {navItems.map((item) => {
            if (item.permission && !hasPermission(item.permission)) return null;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </div>

        {/* Search */}
        <div className="hidden min-[960px]:flex items-center relative">
          <Search className="absolute left-2.5 h-4 w-4 text-white/50" />
          <Input
            placeholder="Search..."
            className="w-48 pl-8 h-8 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
          />
        </div>

        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger className="hidden min-[960px]:flex relative h-8 w-8 rounded-full p-0 hover:bg-white/10 cursor-pointer border-0 bg-transparent">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-msacco-navy-light text-white text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-1.5 py-1 text-sm text-muted-foreground">
              {credentials?.username}
            </div>
            <DropdownMenuItem className="text-destructive cursor-pointer" onSelect={logout}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="min-[960px]:hidden text-white hover:bg-white/10 ml-auto"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
}
