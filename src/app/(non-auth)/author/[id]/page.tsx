import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { TabsContent } from '@/components/ui/tabs';
import { authorHttpClient } from '@/lib/http/author.http';

interface AuthorOverviewPageProps {
  params: {
    id: string;
  };
}

export const revalidate = 30;

export async function generateMetadata({
  params: { id },
}: AuthorOverviewPageProps) {
  const { data: author } = await authorHttpClient.getAuthorById(id);

  return {
    title: author.name,
  };
}

export default async function AuthorOverviewPage({
  params: { id },
}: AuthorOverviewPageProps) {
  const { data: author } = await authorHttpClient.getAuthorById(id);

  return (
    <TabsContent value={`/author/${id}`} className="outline-none">
      <Table>
        <TableBody>
          <TableRow>
            <TableHead>Name:</TableHead>
            <TableCell>{author.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Year of birth:</TableHead>
            <TableCell>{author.yearOfBirth || 'N/A'}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Year of death:</TableHead>
            <TableCell>{author.yearOfDeath || 'N/A'}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Nationality:</TableHead>
            <TableCell>{author.nationality || 'N/A'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TabsContent>
  );
}
