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
import { useAddIdentifier } from '../hooks/use-client-mutations';

const schema = z.object({
  documentTypeId: z.string().min(1, 'Document type is required'),
  documentKey: z.string().min(1, 'Document key is required'),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface AddIdentificationDialogProps {
  clientId: number;
  open: boolean;
  onClose: () => void;
}

export function AddIdentificationDialog({ clientId, open, onClose }: AddIdentificationDialogProps) {
  const mutation = useAddIdentifier(clientId);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(
      { documentTypeId: Number(data.documentTypeId), documentKey: data.documentKey, description: data.description },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Identification</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="documentTypeId">Document Type ID</Label>
            <Input id="documentTypeId" placeholder="e.g. 1" {...register('documentTypeId')} />
            {errors.documentTypeId && (
              <p className="text-sm text-destructive">{errors.documentTypeId.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="documentKey">Document Key</Label>
            <Input id="documentKey" placeholder="ID number" {...register('documentKey')} />
            {errors.documentKey && (
              <p className="text-sm text-destructive">{errors.documentKey.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input id="description" placeholder="Notes" {...register('description')} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-msacco-navy hover:bg-msacco-navy-light" disabled={mutation.isPending}>
              {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
