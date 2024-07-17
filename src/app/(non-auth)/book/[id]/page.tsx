import axios from 'axios';
import { HandHelping, Heart } from 'lucide-react';
import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import placeholderImg from '@/assets/images/placeholder-200x300.svg';
import { Book } from '@/common/types/api/book.type';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import HomeBanner from '@/components/ui/home-banner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import BookActionsContainer from '@/containers/book-actions.container';
import { cn } from '@/lib/utils';

interface BookDetailsPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: BookDetailsPageProps): Promise<Metadata> {
  const book = await getBook(id);

  return {
    title: book.title,
  };
}

export default async function BookDetailsPage({
  params: { id },
}: BookDetailsPageProps) {
  const book = await getBook(id);

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
                <TableCell>{book.isbn || 'Updating...'}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Authors:</TableHead>
                <TableCell className="flex flex-wrap gap-2">
                  {book.authors.length === 0
                    ? 'Updating...'
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
                    ? 'Updating...'
                    : book.categories.map(category => (
                        <Link
                          key={category.id}
                          href={`/search?categoryId=${category.id}`}
                        >
                          <Badge className="text-base">{category.name}</Badge>
                        </Link>
                      ))}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Published year:</TableHead>
                <TableCell>{book.publishedYear || 'Updating...'}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Publisher:</TableHead>
                <TableCell>{book.publisher || 'Updating...'}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Language:</TableHead>
                <TableCell>{book.language || 'Updating...'}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Number of pages:</TableHead>
                <TableCell>{book.numberOfPages || 'Updating...'}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Description:</TableHead>
                <TableCell>{book.description || 'Updating...'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

async function getBook(id: string) {
  const requestUrl = new URL(
    `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/books/${id}`,
  );
  const res = await axios.get<Book>(requestUrl.href);
  return res.data;
}
