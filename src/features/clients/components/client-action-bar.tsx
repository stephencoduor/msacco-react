import { useNavigate } from 'react-router';
import { ArrowLeft, Pencil, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClientActionBarProps {
  onEdit?: () => void;
  onSave?: () => void;
  onApprove?: () => void;
  isSaving?: boolean;
}

export function ClientActionBar({ onEdit, onSave, onApprove, isSaving }: ClientActionBarProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <Button
        className="bg-msacco-navy hover:bg-msacco-navy-light text-white"
        onClick={() => navigate('/clients')}
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" />
        Back
      </Button>
      <div className="flex gap-2">
        {onEdit && (
          <Button
            className="bg-msacco-orange hover:bg-msacco-orange/90 text-white"
            onClick={onEdit}
          >
            <Pencil className="h-4 w-4 mr-1.5" />
            Edit Client
          </Button>
        )}
        {onApprove && (
          <Button
            className="bg-msacco-teal hover:bg-msacco-teal/90 text-white"
            onClick={onApprove}
          >
            <Check className="h-4 w-4 mr-1.5" />
            Approve
          </Button>
        )}
        {onSave && (
          <Button
            className="bg-msacco-navy hover:bg-msacco-navy-light"
            onClick={onSave}
            disabled={isSaving}
          >
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
}
