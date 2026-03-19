import { NavLink } from 'react-router';
import {
  IdCard,
  Briefcase,
  Users,
  FileText,
  StickyNote,
} from 'lucide-react';

const sidebarLinks = [
  { label: 'Identification', path: 'identification', icon: IdCard },
  { label: 'Business', path: 'business', icon: Briefcase },
  { label: 'Next of Kin', path: 'next-of-kin', icon: Users },
  { label: 'Documents', path: 'documents', icon: FileText },
  { label: 'Notes', path: 'notes', icon: StickyNote },
];

export function ClientSidebar() {
  return (
    <aside className="w-52 shrink-0">
      <div className="sticky top-20">
        <h3 className="text-xs font-semibold text-msacco-text-muted uppercase tracking-wider mb-2 px-3">
          Client Info
        </h3>
        <nav className="flex flex-col gap-0.5">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-msacco-navy text-white font-medium'
                    : 'text-msacco-text hover:bg-msacco-page-bg'
                }`
              }
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
