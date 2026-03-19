import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ClientTabs, statusMap } from '../components/client-tabs';
import { ClientSearchForm } from '../components/client-search-form';
import { ClientTable } from '../components/client-table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useClientsSearch } from '../hooks/use-clients-search';

export function ClientListPage() {
  const [activeTab, setActiveTab] = useState('active');
  const [page, setPage] = useState(0);
  const [searchParams, setSearchParams] = useState({
    displayName: '',
    accountNo: '',
    externalId: '',
  });
  const pageSize = 15;

  const { data, isLoading } = useClientsSearch({
    ...searchParams,
    status: statusMap[activeTab],
    page,
    size: pageSize,
  });

  const clients = data?.pageItems ?? [];
  const total = data?.totalFilteredRecords ?? 0;
  const from = page * pageSize + 1;
  const to = Math.min((page + 1) * pageSize, total);

  const handleSearch = (params: { accountNo: string; displayName: string; groupName: string }) => {
    setPage(0);
    setSearchParams({
      displayName: params.displayName,
      accountNo: params.accountNo,
      externalId: params.groupName, // Use group name field for external ID search
    });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setPage(0);
  };

  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-msacco-navy-heading">Search Clients</h1>
        <Button
          className="bg-msacco-teal hover:bg-msacco-teal/90"
          onClick={() => navigate('/clients/create')}
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Create Client
        </Button>
      </div>

      <ClientTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="rounded-lg border border-msacco-border bg-white p-4 space-y-4">
        <ClientSearchForm onSearch={handleSearch} />
        <ClientTable clients={clients} isLoading={isLoading} />

        {/* Pagination */}
        {total > 0 && (
          <div className="flex items-center justify-between text-sm text-msacco-text-muted">
            <span>
              Showing {from} to {to} of {total} entries
            </span>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={to >= total}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
