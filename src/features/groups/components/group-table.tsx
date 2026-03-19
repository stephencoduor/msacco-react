import { useNavigate } from 'react-router';
import { Eye } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { GroupSummary } from '@/types/group';

interface GroupTableProps {
  groups: GroupSummary[];
  isLoading: boolean;
}

export function GroupTable({ groups, isLoading }: GroupTableProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-md border border-msacco-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-msacco-navy hover:bg-msacco-navy">
            <TableHead className="text-white font-semibold">Account No.</TableHead>
            <TableHead className="text-white font-semibold">Group Name</TableHead>
            <TableHead className="text-white font-semibold">External ID</TableHead>
            <TableHead className="text-white font-semibold">Branch</TableHead>
            <TableHead className="text-white font-semibold">Status</TableHead>
            <TableHead className="text-white font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No groups found.
              </TableCell>
            </TableRow>
          ) : (
            groups.map((group, index) => (
              <TableRow
                key={group.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-msacco-page-bg'}
              >
                <TableCell className="font-mono text-sm">{group.accountNo}</TableCell>
                <TableCell className="font-medium">{group.name}</TableCell>
                <TableCell>{group.externalId ?? '—'}</TableCell>
                <TableCell>{group.officeName}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-1.5 text-sm">
                    <span className={`inline-block h-2 w-2 rounded-full ${group.active ? 'bg-msacco-teal' : 'bg-yellow-500'}`} />
                    {group.status.value}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    className="h-7 bg-msacco-navy hover:bg-msacco-navy-light text-xs"
                    onClick={() => navigate(`/groups/${group.id}`)}
                  >
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
