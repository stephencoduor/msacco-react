import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import type { ClientDetail } from '@/types/client';

interface ClientHeaderCardProps {
  client?: ClientDetail;
  isLoading: boolean;
}

function getStatusDot(statusCode: string) {
  switch (statusCode) {
    case 'clientStatusType.active':
      return 'bg-msacco-teal';
    case 'clientStatusType.pending':
      return 'bg-yellow-500';
    case 'clientStatusType.closed':
      return 'bg-gray-500';
    default:
      return 'bg-gray-400';
  }
}

export function ClientHeaderCard({ client, isLoading }: ClientHeaderCardProps) {
  if (isLoading || !client) {
    return (
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <Skeleton className="h-14 w-14 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const initials = client.displayName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-4">
        <Avatar className="h-14 w-14">
          <AvatarFallback className="bg-msacco-navy text-white text-lg">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-msacco-navy-heading">{client.displayName}</h2>
            <span className="flex items-center gap-1.5 text-sm">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${getStatusDot(client.status.code)}`} />
              {client.status.value}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1 text-sm text-msacco-text-muted">
            <span>Client ID: <strong className="text-msacco-text">{client.id}</strong></span>
            <span className="text-msacco-border">|</span>
            <span>Account: <strong className="text-msacco-text">{client.accountNo}</strong></span>
            <span className="text-msacco-border">|</span>
            <span>Branch: <strong className="text-msacco-text">{client.officeName}</strong></span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
