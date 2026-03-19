import { useState } from 'react';
import { useParams, useNavigate, Outlet, Navigate, NavLink } from 'react-router';
import { ClientHeaderCard } from '../components/client-header-card';
import { ClientActionBar } from '../components/client-action-bar';
import { useClientDetail } from '../hooks/use-client-detail';
import { ApproveClientDialog } from '../dialogs/approve-client-dialog';

const detailTabs = [
  { label: 'Client Identification', path: 'identification' },
  { label: 'Business', path: 'business' },
  { label: 'Next of Kin', path: 'next-of-kin' },
  { label: 'Documents', path: 'documents' },
  { label: 'Notes', path: 'notes' },
];

export function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const clientId = Number(id);
  const { data: client, isLoading } = useClientDetail(clientId);
  const [approveOpen, setApproveOpen] = useState(false);

  if (!id || isNaN(clientId)) {
    return <Navigate to="/clients" replace />;
  }

  const isPending = client?.status?.code === 'clientStatusType.pending';

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-msacco-navy-heading">Client Details</h1>

      <ClientHeaderCard client={client} isLoading={isLoading} />

      <div className="rounded-lg border border-msacco-border bg-white">
        {/* Horizontal Tabs - matching design */}
        <div className="flex gap-4 px-6 pt-4">
          {/* Left sidebar label */}
          <div className="w-48 shrink-0">
            <h3 className="text-base font-semibold text-msacco-navy-heading py-2">Client Info</h3>
            <nav className="flex flex-col gap-0.5 mt-2">
              {detailTabs.map((tab) => (
                <NavLink
                  key={tab.path}
                  to={tab.path}
                  end
                  className={({ isActive }) =>
                    `px-3 py-2 rounded text-sm transition-colors ${
                      isActive
                        ? 'bg-msacco-navy text-white font-medium'
                        : 'text-msacco-text hover:bg-msacco-page-bg'
                    }`
                  }
                >
                  {tab.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="flex-1 min-w-0 py-2">
            <Outlet context={{ clientId, client }} />
          </div>
        </div>
      </div>

      <ClientActionBar
        onEdit={() => navigate(`/clients/${clientId}/edit`)}
        onApprove={isPending ? () => setApproveOpen(true) : undefined}
      />

      <ApproveClientDialog
        clientId={clientId}
        open={approveOpen}
        onClose={() => setApproveOpen(false)}
      />
    </div>
  );
}
