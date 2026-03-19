import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ClientTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  counts?: { active: number; pending: number; closed: number };
}

const tabs = [
  { value: 'active', label: 'Clients', statusId: '300' },
  { value: 'pending', label: 'Pending Approval', statusId: '100' },
  { value: 'closed', label: 'Closed Clients', statusId: '600' },
];

export function ClientTabs({ activeTab, onTabChange, counts }: ClientTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="bg-white border border-msacco-border">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:bg-msacco-navy data-[state=active]:text-white"
          >
            {tab.label}
            {counts && (
              <span className="ml-1.5 text-xs opacity-70">
                ({counts[tab.value as keyof typeof counts]})
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export const statusMap: Record<string, string> = {
  active: 'active',
  pending: 'pending',
  closed: 'closed',
};
