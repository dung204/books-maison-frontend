import { TabsContent } from '@radix-ui/react-tabs';
import { randomUUID } from 'crypto';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

import { BookSearchParams } from '@/common/types/api/book';
import { BooksGridSkeleton } from '@/components/ui/skeletons';
import { BookSearchContainer } from '@/containers/book';
import { favouriteBookHttpClient } from '@/lib/http';

interface FavouriteBooksPageProps {
  searchParams: Promise<BookSearchParams>;
}

interface FavouriteBookFetchProps {
  searchParams: BookSearchParams;
}

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'My favourite books',
};

export default async function FavouriteBooksPage(
  props: FavouriteBooksPageProps,
) {
  const searchParams = await props.searchParams;

  return (
    <TabsContent value="/me/favourite-books" className="outline-none">
      <Suspense key={randomUUID()} fallback={<BooksGridSkeleton />}>
        <FavouriteBookFetch searchParams={searchParams} />
      </Suspense>
    </TabsContent>
  );
}

async function FavouriteBookFetch({ searchParams }: FavouriteBookFetchProps) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const { data: books, pagination } =
    await favouriteBookHttpClient.getAllFavouriteBooksOfCurrentUser(
      accessToken!,
      searchParams,
    );

  return (
    <BookSearchContainer
      books={books}
      pagination={pagination}
      searchParams={searchParams}
    />
  );
}
