import { randomUUID } from 'crypto';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import type { BookSearchParams } from '@/common/types/api/book';
import { BooksSearchContainerSkeleton } from '@/components/ui/skeletons';
import { TabsContent } from '@/components/ui/tabs';
import { BookSearchContainer } from '@/containers/book';
import { authorHttpClient, bookHttpClient } from '@/lib/http';

type AuthorBooksSearchParams = Omit<BookSearchParams, 'authorName'>;

interface AuthorBooksPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<AuthorBooksSearchParams>;
}

interface AuthorBookFetchProps {
  authorId: string;
  searchParams: BookSearchParams;
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
      <Suspense key={randomUUID()} fallback={<BooksSearchContainerSkeleton />}>
        <AuthorBookFetch authorId={id} searchParams={bookSearchParams} />
      </Suspense>
    </TabsContent>
  );
}

async function AuthorBookFetch({
  authorId,
  searchParams,
}: AuthorBookFetchProps) {
  const { data: author } = await authorHttpClient.getAuthorById(authorId);
  const { data: books, pagination } = await bookHttpClient.getAllBooks({
    ...searchParams,
    authorName: author.name,
  });

  return (
    <BookSearchContainer
      books={books}
      pagination={pagination}
      searchParams={{ ...searchParams, authorName: author.name }}
      advancedFilterHiddenFields={['authorName']}
    />
  );
}
