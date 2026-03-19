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
  activationDate: z.string().min(1, 'Activation date is required'),
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
    defaultValues: { activationDate: new Date().toISOString().split('T')[0] },
  });

  const onSubmit = (data: { activationDate: string }) => {
    const [y, m, d] = data.activationDate.split('-');
    command.mutate(
      {
        command: 'activate',
        data: { activationDate: `${d} ${getMonthName(+m)} ${y}`, dateFormat: 'dd MMMM yyyy', locale: 'en' },
      },
      { onSuccess: onClose }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Approve Client</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="activationDate">Activation Date</Label>
            <Input id="activationDate" type="date" {...register('activationDate')} />
            {errors.activationDate && (
              <p className="text-sm text-destructive">{errors.activationDate.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-msacco-teal hover:bg-msacco-teal/90" disabled={command.isPending}>
              {command.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
              Approve
            </Button>
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
