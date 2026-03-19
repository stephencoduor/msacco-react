import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useClientFamily } from '../hooks/use-client-family';

interface NextOfKinTabProps {
  clientId: number;
}

export function NextOfKinTab({ clientId }: NextOfKinTabProps) {
  const { data: members, isLoading } = useClientFamily(clientId);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-msacco-navy-heading">Next of Kin</CardTitle>
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
                <TableHead>Relationship</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Dependent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(!members || members.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                    No next of kin records found.
                  </TableCell>
                </TableRow>
              ) : (
                members.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">
                      {m.firstName} {m.middleName ?? ''} {m.lastName}
                    </TableCell>
                    <TableCell>{m.relationship?.name ?? '—'}</TableCell>
                    <TableCell>{m.gender?.name ?? '—'}</TableCell>
                    <TableCell>{m.age}</TableCell>
                    <TableCell>{m.mobileNumber ?? '—'}</TableCell>
                    <TableCell>{m.isDependent ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
