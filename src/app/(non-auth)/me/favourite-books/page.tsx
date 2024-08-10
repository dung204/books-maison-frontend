import { TabsContent } from '@radix-ui/react-tabs';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { BookSearchParams } from '@/common/types/api/book/book-search-params.type';
import BookSearchContainer from '@/containers/book-search.container';
import { favouriteBookHttpClient } from '@/lib/http/favourite-book.http';

interface FavouriteBooksPageProps {
  searchParams: BookSearchParams;
}

export const metadata: Metadata = {
  title: 'My favourite books',
};

export default async function FavouriteBooksPage({
  searchParams,
}: FavouriteBooksPageProps) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const { data: books, pagination } =
    await favouriteBookHttpClient.getAllFavouriteBooksOfCurrentUser(
      accessToken!,
      searchParams,
    );

  return (
    <TabsContent value="/me/favourite-books" className="outline-none">
      <BookSearchContainer
        books={books}
        pagination={pagination}
        searchParams={searchParams}
      />
    </TabsContent>
  );
}
