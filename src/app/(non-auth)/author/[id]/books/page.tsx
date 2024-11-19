import { randomUUID } from 'crypto';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { BookSearchParams } from '@/common/types/api/book/book-search-params.type';
import BooksGridLoading from '@/components/ui/books-grid-loading';
import { TabsContent } from '@/components/ui/tabs';
import AuthorBookFetchContainer from '@/containers/author-book-fetch.container';
import { authorHttpClient } from '@/lib/http/author.http';

type AuthorBooksSearchParams = Omit<BookSearchParams, 'authorName'>;

interface AuthorBooksPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<AuthorBooksSearchParams>;
}

export const revalidate = 0;

export async function generateMetadata({
  params,
}: AuthorBooksPageProps): Promise<Metadata> {
  const { id } = await params;
  const { data: author } = await authorHttpClient.getAuthorById(id);

  return {
    title: `${author.name}'s books`,
  };
}

export default async function AuthorBooksPage({
  searchParams,
  params,
}: AuthorBooksPageProps) {
  const bookSearchParams = await searchParams;
  const { id } = await params;

  return (
    <TabsContent value={`/author/${id}/books`} className="outline-none">
      <Suspense key={randomUUID()} fallback={<BooksGridLoading />}>
        <AuthorBookFetchContainer
          authorId={id}
          searchParams={bookSearchParams}
        />
      </Suspense>
    </TabsContent>
  );
}
