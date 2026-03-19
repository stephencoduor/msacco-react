import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useClientFamily } from '../hooks/use-client-family';
import { AddBusinessDialog } from '../dialogs/add-business-dialog';

interface BusinessTabProps {
  clientId: number;
}

export function BusinessTab({ clientId }: BusinessTabProps) {
  const { data: members, isLoading } = useClientFamily(clientId);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filter for business-type family members (profession-based)
  const businessMembers = members?.filter((m) => m.profession) ?? [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg text-msacco-navy-heading">Business Details</CardTitle>
        <Button
          size="sm"
          className="bg-msacco-navy hover:bg-msacco-navy-light"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Business
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
                <TableHead>Name</TableHead>
                <TableHead>Profession</TableHead>
                <TableHead>Mobile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {businessMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-6">
                    No business details found.
                  </TableCell>
                </TableRow>
              ) : (
                businessMembers.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">
                      {m.firstName} {m.middleName ?? ''} {m.lastName}
                    </TableCell>
                    <TableCell>{m.profession?.name ?? '—'}</TableCell>
                    <TableCell>{m.mobileNumber ?? '—'}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <AddBusinessDialog
        clientId={clientId}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Card>
  );
}
