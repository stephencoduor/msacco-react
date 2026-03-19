import { useForm } from 'react-hook-form';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SearchFormData {
  accountNo: string;
  displayName: string;
  groupName: string;
}

interface ClientSearchFormProps {
  onSearch: (data: SearchFormData) => void;
}

export function ClientSearchForm({ onSearch }: ClientSearchFormProps) {
  const { register, handleSubmit, reset } = useForm<SearchFormData>({
    defaultValues: { accountNo: '', displayName: '', groupName: '' },
  });

  return (
    <form onSubmit={handleSubmit(onSearch)} className="flex flex-wrap items-end gap-3">
      <div className="space-y-1">
        <Label htmlFor="accountNo" className="text-xs">Client ID</Label>
        <Input
          id="accountNo"
          placeholder="Account No."
          className="h-9 w-36"
          {...register('accountNo')}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="displayName" className="text-xs">Name</Label>
        <Input
          id="displayName"
          placeholder="Client Name"
          className="h-9 w-48"
          {...register('displayName')}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="groupName" className="text-xs">Group Name</Label>
        <Input
          id="groupName"
          placeholder="Group Name"
          className="h-9 w-48"
          {...register('groupName')}
        />
      </div>
      <Button type="submit" className="h-9 bg-msacco-navy hover:bg-msacco-navy-light">
        <Search className="h-4 w-4 mr-1.5" />
        Search
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-9"
        onClick={() => {
          reset();
          onSearch({ accountNo: '', displayName: '', groupName: '' });
        }}
      >
        Clear
      </Button>
    </form>
  );
}
