import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useClientNotes } from '../hooks/use-client-notes';
import { useCreateNote } from '../hooks/use-client-mutations';

interface NotesTabProps {
  clientId: number;
}

export function NotesTab({ clientId }: NotesTabProps) {
  const { data: notes, isLoading } = useClientNotes(clientId);
  const createNote = useCreateNote(clientId);
  const [newNote, setNewNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    createNote.mutate(newNote, {
      onSuccess: () => setNewNote(''),
    });
  };

  const formatDate = (dateArr: number[]) => {
    if (!dateArr || dateArr.length < 3) return '—';
    return new Date(dateArr[0], dateArr[1] - 1, dateArr[2]).toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-msacco-navy-heading">Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add note form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            className="flex-1 min-h-[60px] rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button
            type="submit"
            size="sm"
            className="self-end bg-msacco-navy hover:bg-msacco-navy-light"
            disabled={createNote.isPending || !newNote.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>

        <Separator />

        {/* Notes list */}
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        ) : (!notes || notes.length === 0) ? (
          <p className="text-center text-muted-foreground py-6">No notes yet.</p>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => (
              <div key={note.id} className="rounded-md border border-msacco-border p-3">
                <p className="text-sm whitespace-pre-wrap">{note.note}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span>{note.createdByUsername}</span>
                  <span>&middot;</span>
                  <span>{formatDate(note.createdOn)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
