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
import { useAddFamilyMember } from '../hooks/use-client-mutations';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  mobileNumber: z.string().optional(),
  professionId: z.string().optional(),
  relationshipId: z.string().min(1, 'Relationship is required'),
  genderId: z.string().min(1, 'Gender is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
});

type FormData = z.infer<typeof schema>;

interface AddBusinessDialogProps {
  clientId: number;
  open: boolean;
  onClose: () => void;
}

export function AddBusinessDialog({ clientId, open, onClose }: AddBusinessDialogProps) {
  const mutation = useAddFamilyMember(clientId);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const [y, m, d] = data.dateOfBirth.split('-');
    mutation.mutate(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        mobileNumber: data.mobileNumber,
        professionId: data.professionId ? Number(data.professionId) : undefined,
        relationshipId: Number(data.relationshipId),
        genderId: Number(data.genderId),
        dateOfBirth: `${d} ${getMonthName(+m)} ${y}`,
        dateFormat: 'dd MMMM yyyy',
        locale: 'en',
        isDependent: false,
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
          <DialogTitle>Add Business Contact</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...register('firstName')} />
              {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...register('lastName')} />
              {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="genderId">Gender ID</Label>
              <Input id="genderId" placeholder="e.g. 22" {...register('genderId')} />
              {errors.genderId && <p className="text-sm text-destructive">{errors.genderId.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="relationshipId">Relationship ID</Label>
              <Input id="relationshipId" placeholder="e.g. 1" {...register('relationshipId')} />
              {errors.relationshipId && <p className="text-sm text-destructive">{errors.relationshipId.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input id="dateOfBirth" type="date" {...register('dateOfBirth')} />
              {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input id="mobileNumber" {...register('mobileNumber')} />
            </div>
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

function getMonthName(month: number): string {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return months[month - 1] ?? '';
}
