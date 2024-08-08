import axios from 'axios';

import { Author } from '@/common/types/api/author.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { TabsContent } from '@/components/ui/tabs';

interface AuthorOverviewPageProps {
  params: {
    id: string;
  };
}

export const revalidate = 30;

export async function generateMetadata({
  params: { id },
}: AuthorOverviewPageProps) {
  const author = await getAuthor(id);

  return {
    title: author.name,
  };
}

export default async function AuthorOverviewPage({
  params: { id },
}: AuthorOverviewPageProps) {
  const author = await getAuthor(id);

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

async function getAuthor(id: string) {
  const requestUrl = new URL(
    `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/authors/${id}`,
  );
  const res = await axios.get<SuccessResponse<Author>>(requestUrl.href);
  return res.data.data;
}
