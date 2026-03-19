import { useNavigate } from 'react-router';
import { Users, UsersRound, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '@/stores/auth-store';
import { useDashboardStats, useRecentClients, useRecentGroups } from '../hooks/use-dashboard';

export function HomePage() {
  const navigate = useNavigate();
  const username = useAuthStore((s) => s.credentials?.username);
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: recentClients, isLoading: clientsLoading } = useRecentClients();
  const { data: recentGroups, isLoading: groupsLoading } = useRecentGroups();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-msacco-navy-heading">
          Welcome, {username}
        </h1>
        <p className="text-msacco-text-muted mt-1">Here's an overview of your M-Sacco system.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Clients"
          value={stats?.clients.total}
          loading={statsLoading}
          icon={<Users className="h-5 w-5 text-msacco-navy" />}
          onClick={() => navigate('/clients')}
        />
        <StatCard
          title="Total Groups"
          value={stats?.groups.total}
          loading={statsLoading}
          icon={<UsersRound className="h-5 w-5 text-msacco-teal" />}
          onClick={() => navigate('/groups')}
        />
        <StatCard
          title="Active Loans"
          value={stats?.loans.total}
          loading={statsLoading}
          icon={<span className="text-lg">💰</span>}
        />
        <StatCard
          title="Savings Accounts"
          value={stats?.savings.total}
          loading={statsLoading}
          icon={<span className="text-lg">🏦</span>}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Clients */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base text-msacco-navy-heading">Recent Clients</CardTitle>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => navigate('/clients')}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {clientsLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-msacco-page-bg">
                    <TableHead className="text-xs">Name</TableHead>
                    <TableHead className="text-xs">Branch</TableHead>
                    <TableHead className="text-xs text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentClients?.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="text-sm font-medium">{c.displayName}</TableCell>
                      <TableCell className="text-sm">{c.officeName}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-msacco-navy"
                          onClick={() => navigate(`/clients/${c.id}`)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Recent Groups */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base text-msacco-navy-heading">Recent Groups</CardTitle>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => navigate('/groups')}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {groupsLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-msacco-page-bg">
                    <TableHead className="text-xs">Group Name</TableHead>
                    <TableHead className="text-xs">Branch</TableHead>
                    <TableHead className="text-xs text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentGroups?.map((g) => (
                    <TableRow key={g.id}>
                      <TableCell className="text-sm font-medium">{g.name}</TableCell>
                      <TableCell className="text-sm">{g.officeName}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-msacco-navy"
                          onClick={() => navigate(`/groups/${g.id}`)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, loading, icon, onClick }: {
  title: string;
  value?: number;
  loading: boolean;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Card
      className={onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div className="rounded-lg bg-msacco-page-bg p-2.5">
          {icon}
        </div>
        <div>
          <p className="text-sm text-msacco-text-muted">{title}</p>
          {loading ? (
            <Skeleton className="h-7 w-16 mt-1" />
          ) : (
            <p className="text-2xl font-bold text-msacco-navy-heading">{value ?? 0}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
