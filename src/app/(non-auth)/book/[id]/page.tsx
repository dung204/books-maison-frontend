import { type Metadata } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import placeholderImg from '@/assets/images/placeholder-200x300.svg';
import { Badge } from '@/components/ui/badges';
import HomeBanner from '@/components/ui/home-banner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/tables';
import { BookActionsContainer } from '@/containers/book';
import { cn } from '@/lib/cn';
import { bookHttpClient } from '@/lib/http';

export const revalidate = 60;

interface BookDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: BookDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const { data: book } = await bookHttpClient.getBookById(id);

  return {
    title: book.title,
  };
}

export default async function BookDetailsPage({
  params,
}: BookDetailsPageProps) {
  const { id } = await params;
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get('accessToken')?.value;
  const { data: book } = await bookHttpClient.getBookById(id, accessToken);

  return (
    <>
      <HomeBanner className="h-[400px]" bannerTitle="Book details" />
      <div className="container grid grid-cols-12 gap-10 py-10">
        <div className="col-span-4">
          <div className="relative h-[600px] w-full">
            <Image
              src={book.imageUrl || placeholderImg}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <p className="mt-8 text-center">
            Available quantity:{' '}
            <span
              className={cn('font-bold', {
                'text-red-500': book.quantity === 0,
              })}
            >
              {book.quantity === 0 ? 'Out of stock' : book.quantity}
            </span>
          </p>
          <BookActionsContainer book={book} />
        </div>
        <div className="col-span-8">
          <h2 className="text-4xl font-bold">{book.title}</h2>
          <Table className="mt-6 text-base">
            <TableBody>
              <TableRow>
                <TableHead>ISBN:</TableHead>
                <TableCell>{book.isbn || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Authors:</TableHead>
                <TableCell className="flex flex-wrap gap-2">
                  {book.authors.length === 0
                    ? 'N/A'
                    : book.authors.map(author => (
                        <Link key={author.id} href={`/author/${author.id}`}>
                          <Badge className="text-base">{author.name}</Badge>
                        </Link>
                      ))}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Categories:</TableHead>
                <TableCell className="flex flex-wrap gap-2">
                  {book.categories.length === 0
                    ? 'N/A'
                    : book.categories.map(category => (
                        <Link
                          key={category.id}
                          href={`/books?categoryId=${category.id}`}
                        >
                          <Badge className="text-base">{category.name}</Badge>
                        </Link>
                      ))}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Published year:</TableHead>
                <TableCell>{book.publishedYear || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Publisher:</TableHead>
                <TableCell>{book.publisher || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Language:</TableHead>
                <TableCell>{book.language || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Number of pages:</TableHead>
                <TableCell>{book.numberOfPages || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Description:</TableHead>
                <TableCell>{book.description || 'N/A'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
