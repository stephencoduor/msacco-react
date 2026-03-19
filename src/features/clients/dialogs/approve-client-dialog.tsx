import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useClientCommand } from '../hooks/use-client-mutations';

const schema = z.object({
  approvalDate: z.string().min(1, 'Approval date is required'),
});

interface ApproveClientDialogProps {
  clientId: number;
  open: boolean;
  onClose: () => void;
}

export function ApproveClientDialog({ clientId, open, onClose }: ApproveClientDialogProps) {
  const command = useClientCommand(clientId);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { approvalDate: new Date().toISOString().split('T')[0] },
  });

  const onSubmit = (data: { approvalDate: string }) => {
    const [y, m, d] = data.approvalDate.split('-');
    command.mutate(
      {
        command: 'activate',
        data: {
          activationDate: `${d} ${getMonthName(+m)} ${y}`,
          dateFormat: 'dd MMMM yyyy',
          locale: 'en',
        },
      },
      { onSuccess: onClose }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Approve Client</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
            <Label htmlFor="approvalDate" className="text-right">Approval Date *</Label>
            <Input id="approvalDate" type="date" {...register('approvalDate')} />
            {errors.approvalDate && (
              <div className="col-start-2">
                <p className="text-sm text-destructive">{errors.approvalDate.message}</p>
              </div>
            )}

            <Label className="text-right text-sm">Savings Accounts<br/>That will be Auto<br/>Created</Label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300" />
              <span className="text-sm">Compulsory Savings</span>
            </label>
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-msacco-navy hover:bg-msacco-navy-light" disabled={command.isPending}>
              {command.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
              Submit
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>Close</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function getMonthName(month: number): string {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return months[month - 1] ?? '';
}
