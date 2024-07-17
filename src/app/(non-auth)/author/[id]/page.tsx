import axios from 'axios';
import Link from 'next/link';

import { Author } from '@/common/types/api/author.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    <Tabs className="w-full" defaultValue="overview">
      <TabsList className="mb-6 grid w-full grid-cols-3">
        <Link href={`/author/${id}`}>
          <TabsTrigger value="overview" className="w-full">
            Overview
          </TabsTrigger>
        </Link>
        <Link href={`/author/${id}/bio`}>
          <TabsTrigger value="bio" className="w-full">
            Biography
          </TabsTrigger>
        </Link>
        <Link href={`/author/${id}/books?title=&page=1&pageSize=10`}>
          <TabsTrigger value="books" className="w-full">
            Books
          </TabsTrigger>
        </Link>
      </TabsList>

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
    </Tabs>
  );
}

async function getAuthor(id: string) {
  const requestUrl = new URL(
    `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/authors/${id}`,
  );
  const res = await axios.get<SuccessResponse<Author>>(requestUrl.href);
  return res.data.data;
}
