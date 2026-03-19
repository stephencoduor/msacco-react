import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useClientIdentifiers } from '../hooks/use-client-identifiers';
import { AddIdentificationDialog } from '../dialogs/add-identification-dialog';

interface IdentificationTabProps {
  clientId: number;
}

export function IdentificationTab({ clientId }: IdentificationTabProps) {
  const { data: identifiers, isLoading } = useClientIdentifiers(clientId);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg text-msacco-navy-heading">Identification</CardTitle>
        <Button
          size="sm"
          className="bg-msacco-navy hover:bg-msacco-navy-light"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-msacco-page-bg">
                <TableHead>Document Type</TableHead>
                <TableHead>Document Key</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(!identifiers || identifiers.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                    No identification documents found.
                  </TableCell>
                </TableRow>
              ) : (
                identifiers.map((id) => (
                  <TableRow key={id.id}>
                    <TableCell>{id.documentType.name}</TableCell>
                    <TableCell className="font-mono">{id.documentKey}</TableCell>
                    <TableCell>{id.description || '—'}</TableCell>
                    <TableCell>{id.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <AddIdentificationDialog
        clientId={clientId}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Card>
  );
}
