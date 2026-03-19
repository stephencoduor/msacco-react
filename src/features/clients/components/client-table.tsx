import { useNavigate } from 'react-router';
import { Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { ClientSummary } from '@/types/client';

interface ClientTableProps {
  clients: ClientSummary[];
  isLoading: boolean;
}

export function ClientTable({ clients, isLoading }: ClientTableProps) {
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
            <TableHead className="text-white font-semibold">Display Name</TableHead>
            <TableHead className="text-white font-semibold">Group Name</TableHead>
            <TableHead className="text-white font-semibold">Branch</TableHead>
            <TableHead className="text-white font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No clients found.
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client, index) => (
              <TableRow
                key={client.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-msacco-page-bg'}
              >
                <TableCell className="font-mono text-sm">{client.accountNo}</TableCell>
                <TableCell className="font-medium">{client.displayName}</TableCell>
                <TableCell>
                  {client.groups?.map((g) => g.name).join(', ') || '—'}
                </TableCell>
                <TableCell>{client.officeName}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    className="h-7 bg-msacco-navy hover:bg-msacco-navy-light text-xs"
                    onClick={() => navigate(`/clients/${client.id}`)}
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
