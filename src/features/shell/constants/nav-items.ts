import {
  LayoutDashboard,
  Users,
  Landmark,
  PiggyBank,
  FileText,
  Settings,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  permission?: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', path: '/home', icon: LayoutDashboard },
  { label: 'Clients', path: '/clients', icon: Users, permission: 'READ_CLIENT' },
  { label: 'Groups', path: '/groups', icon: Users, permission: 'READ_GROUP' },
  { label: 'Accounting', path: '/accounting', icon: Landmark, permission: 'READ_GLACCOUNT' },
  { label: 'Products', path: '/products', icon: PiggyBank, permission: 'READ_LOANPRODUCT' },
  { label: 'Reports', path: '/reports', icon: FileText, permission: 'READ_REPORT' },
  { label: 'Admin', path: '/admin', icon: Settings, permission: 'READ_PERMISSION' },
];
