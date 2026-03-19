import { FileText, Download } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useClientDocuments } from '../hooks/use-client-documents';

interface DocumentsTabProps {
  clientId: number;
}

export function DocumentsTab({ clientId }: DocumentsTabProps) {
  const { data: documents, isLoading } = useClientDocuments(clientId);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg text-msacco-navy-heading">Documents</CardTitle>
        <Button size="sm" className="bg-msacco-navy hover:bg-msacco-navy-light">
          <FileText className="h-4 w-4 mr-1" />
          Upload
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-msacco-page-bg">
                <TableHead>Name</TableHead>
                <TableHead>File Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(!documents || documents.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                    No documents uploaded.
                  </TableCell>
                </TableRow>
              ) : (
                documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell>{doc.fileName ?? '—'}</TableCell>
                    <TableCell>{doc.description ?? '—'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="h-7">
                        <Download className="h-3.5 w-3.5 mr-1" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
