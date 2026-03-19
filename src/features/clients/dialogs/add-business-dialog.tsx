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
  businessName: z.string().min(1, 'Business name is required'),
  businessType: z.string().optional(),
  startDate: z.string().min(1, 'Business start date is required'),
  address: z.string().min(1, 'Address is required'),
  county: z.string().optional(),
  postalCode: z.string().optional(),
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
    const [y, m, d] = data.startDate.split('-');
    mutation.mutate(
      {
        firstName: data.businessName,
        lastName: data.businessType || 'Business',
        mobileNumber: data.postalCode,
        qualification: data.address,
        dateOfBirth: `${d} ${getMonthName(+m)} ${y}`,
        dateFormat: 'dd MMMM yyyy',
        locale: 'en',
        relationshipId: 1,
        genderId: 22,
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
          <DialogTitle className="text-xl font-bold">Business Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
            <Label htmlFor="businessName" className="text-right">Business Name</Label>
            <Input id="businessName" {...register('businessName')} />
            {errors.businessName && (
              <div className="col-start-2">
                <p className="text-sm text-destructive">{errors.businessName.message}</p>
              </div>
            )}

            <Label htmlFor="businessType" className="text-right">Business Type</Label>
            <Input id="businessType" placeholder="e.g. Farming" {...register('businessType')} />

            <Label htmlFor="startDate" className="text-right">Business Start Date *</Label>
            <Input id="startDate" type="date" {...register('startDate')} />
            {errors.startDate && (
              <div className="col-start-2">
                <p className="text-sm text-destructive">{errors.startDate.message}</p>
              </div>
            )}

            <Label htmlFor="address" className="text-right">Address *</Label>
            <Input id="address" {...register('address')} />
            {errors.address && (
              <div className="col-start-2">
                <p className="text-sm text-destructive">{errors.address.message}</p>
              </div>
            )}

            <Label htmlFor="county" className="text-right">County</Label>
            <Input id="county" {...register('county')} />

            <Label htmlFor="postalCode" className="text-right">Postal Code</Label>
            <Input id="postalCode" {...register('postalCode')} />
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

function getMonthName(month: number): string {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return months[month - 1] ?? '';
}
