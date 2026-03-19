import { useNavigate } from 'react-router';
import { Eye } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { GroupClientMember } from '@/types/group';

interface GroupMembersTableProps {
  members: GroupClientMember[];
}

export function GroupMembersTable({ members }: GroupMembersTableProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-md border border-msacco-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-msacco-page-bg">
            <TableHead>Account No.</TableHead>
            <TableHead>Display Name</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                No members in this group.
              </TableCell>
            </TableRow>
          ) : (
            members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-mono text-sm">{member.accountNo}</TableCell>
                <TableCell className="font-medium">{member.displayName}</TableCell>
                <TableCell>{member.officeName}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-1.5 text-sm">
                    <span className={`inline-block h-2 w-2 rounded-full ${member.active ? 'bg-msacco-teal' : 'bg-yellow-500'}`} />
                    {member.status.value}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => navigate(`/clients/${member.id}`)}
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
