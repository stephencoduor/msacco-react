import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GroupTable } from '../components/group-table';
import { useGroupsSearch } from '../hooks/use-groups-search';

export function GroupListPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [appliedName, setAppliedName] = useState('');
  const pageSize = 15;

  const { data, isLoading } = useGroupsSearch({
    name: appliedName,
    page,
    size: pageSize,
  });

  const groups = data?.pageItems ?? [];
  const total = data?.totalFilteredRecords ?? 0;
  const from = page * pageSize + 1;
  const to = Math.min((page + 1) * pageSize, total);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    setAppliedName(searchName);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-msacco-navy-heading">Groups</h1>
        <Button
          className="bg-msacco-teal hover:bg-msacco-teal/90"
          onClick={() => navigate('/groups/create')}
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Create Group
        </Button>
      </div>

      <div className="rounded-lg border border-msacco-border bg-white p-4 space-y-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex items-end gap-3">
          <div className="space-y-1">
            <Label htmlFor="groupName" className="text-xs">Group Name</Label>
            <Input
              id="groupName"
              placeholder="Search by name..."
              className="h-9 w-64"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <Button type="submit" className="h-9 bg-msacco-navy hover:bg-msacco-navy-light">
            <Search className="h-4 w-4 mr-1.5" />
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-9"
            onClick={() => {
              setSearchName('');
              setAppliedName('');
              setPage(0);
            }}
          >
            Clear
          </Button>
        </form>

        <GroupTable groups={groups} isLoading={isLoading} />

        {/* Pagination */}
        {total > 0 && (
          <div className="flex items-center justify-between text-sm text-msacco-text-muted">
            <span>Showing {from} to {to} of {total} entries</span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" disabled={to >= total} onClick={() => setPage((p) => p + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
