import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface WarningDialogProps {
  open: boolean;
  onClose: () => void;
}

export function WarningDialog({ open, onClose }: WarningDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Authorized Use Only</DialogTitle>
          <DialogDescription>
            This system is for authorized users only. All activities are monitored and
            recorded. Unauthorized access or use may result in disciplinary action and/or
            civil and criminal penalties.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose} className="bg-msacco-navy hover:bg-msacco-navy-light">
            I Understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
