import { TabsContent } from '@radix-ui/react-tabs';
import { randomUUID } from 'crypto';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { BookSearchParams } from '@/common/types/api/book/book-search-params.type';
import BooksGridLoading from '@/components/ui/books-grid-loading';
import FavouriteBookFetchContainer from '@/containers/favourite-book-fetch.container';

interface FavouriteBooksPageProps {
  searchParams: BookSearchParams;
}

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'My favourite books',
};

export default async function FavouriteBooksPage({
  searchParams,
}: FavouriteBooksPageProps) {
  return (
    <TabsContent value="/me/favourite-books" className="outline-none">
      <Suspense key={randomUUID()} fallback={<BooksGridLoading />}>
        <FavouriteBookFetchContainer searchParams={searchParams} />
      </Suspense>
    </TabsContent>
  );
}
