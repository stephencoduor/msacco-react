import { useParams, Navigate, useNavigate } from 'react-router';
import { ArrowLeft, Pencil, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { GroupMembersTable } from '../components/group-members-table';
import { useGroupDetail, useGroupAccounts } from '../hooks/use-group-detail';

export function GroupDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const groupId = Number(id);
  const { data: group, isLoading } = useGroupDetail(groupId);
  const { data: accounts } = useGroupAccounts(groupId);

  if (!id || isNaN(groupId)) {
    return <Navigate to="/groups" replace />;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-msacco-navy-heading">Group Details</h1>

      {/* Header Card */}
      <Card>
        <CardContent className="p-4">
          {isLoading || !group ? (
            <div className="space-y-2">
              <Skeleton className="h-6 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-msacco-navy-heading">{group.name}</h2>
                <span className="flex items-center gap-1.5 text-sm">
                  <span className={`inline-block h-2.5 w-2.5 rounded-full ${group.active ? 'bg-msacco-teal' : 'bg-yellow-500'}`} />
                  {group.status.value}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1 text-sm text-msacco-text-muted">
                <span>Group ID: <strong className="text-msacco-text">{group.id}</strong></span>
                <span className="text-msacco-border">|</span>
                <span>Account: <strong className="text-msacco-text">{group.accountNo}</strong></span>
                <span className="text-msacco-border">|</span>
                <span>Branch: <strong className="text-msacco-text">{group.officeName}</strong></span>
                {group.externalId && (
                  <>
                    <span className="text-msacco-border">|</span>
                    <span>External ID: <strong className="text-msacco-text">{group.externalId}</strong></span>
                  </>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Members */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-lg text-msacco-navy-heading flex items-center gap-2">
            <Users className="h-5 w-5" />
            Group Members
          </CardTitle>
          <Button size="sm" className="bg-msacco-navy hover:bg-msacco-navy-light">
            Add Member
          </Button>
        </CardHeader>
        <CardContent>
          <GroupMembersTable members={group?.clientMembers ?? group?.activeClientMembers ?? []} />
        </CardContent>
      </Card>

      {/* Accounts Summary */}
      {accounts && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Savings */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-msacco-navy-heading">Savings Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              {accounts.savingsAccounts?.length ? (
                <ul className="space-y-2">
                  {accounts.savingsAccounts.map((acc) => (
                    <li key={acc.id} className="flex items-center justify-between text-sm border-b border-msacco-border pb-2">
                      <div>
                        <span className="font-medium">{acc.productName}</span>
                        <span className="text-msacco-text-muted ml-2">#{acc.accountNo}</span>
                      </div>
                      <span className="text-xs">{acc.status.value}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No savings accounts.</p>
              )}
            </CardContent>
          </Card>

          {/* Loans */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-msacco-navy-heading">Loan Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              {accounts.loanAccounts?.length ? (
                <ul className="space-y-2">
                  {accounts.loanAccounts.map((acc) => (
                    <li key={acc.id} className="flex items-center justify-between text-sm border-b border-msacco-border pb-2">
                      <div>
                        <span className="font-medium">{acc.productName}</span>
                        <span className="text-msacco-text-muted ml-2">#{acc.accountNo}</span>
                      </div>
                      <span className="text-xs">{acc.status.value}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No loan accounts.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <Button
          className="bg-msacco-navy hover:bg-msacco-navy-light text-white"
          onClick={() => navigate('/groups')}
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back
        </Button>
        <Button
          className="bg-msacco-orange hover:bg-msacco-orange/90 text-white"
          onClick={() => navigate(`/groups/${groupId}/edit`)}
        >
          <Pencil className="h-4 w-4 mr-1.5" />
          Edit Group
        </Button>
      </div>
    </div>
  );
}
