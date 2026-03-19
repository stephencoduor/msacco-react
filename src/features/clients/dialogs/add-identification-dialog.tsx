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
  documentKey: z.string().min(1, 'Unique identification is required'),
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
      {
        documentTypeId: Number(data.documentTypeId),
        documentKey: data.documentKey,
        description: data.description,
      },
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Identification</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
            <Label htmlFor="documentTypeId" className="text-right">Document Type *</Label>
            <select
              id="documentTypeId"
              {...register('documentTypeId')}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">-Select Document Type-</option>
              <option value="1">ID</option>
              <option value="2">Passport</option>
              <option value="3">Driving License</option>
            </select>
            {errors.documentTypeId && (
              <div className="col-start-2">
                <p className="text-sm text-destructive">{errors.documentTypeId.message}</p>
              </div>
            )}

            <Label htmlFor="documentKey" className="text-right">Unique Identification *</Label>
            <Input id="documentKey" {...register('documentKey')} />
            {errors.documentKey && (
              <div className="col-start-2">
                <p className="text-sm text-destructive">{errors.documentKey.message}</p>
              </div>
            )}

            <Label htmlFor="description" className="text-right self-start pt-2">Description</Label>
            <textarea
              id="description"
              {...register('description')}
              rows={3}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />

            <Label className="text-right">Attachment</Label>
            <Input type="file" className="h-9 cursor-pointer" />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Close</Button>
            <Button type="submit" className="bg-msacco-navy hover:bg-msacco-navy-light" disabled={mutation.isPending}>
              {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
