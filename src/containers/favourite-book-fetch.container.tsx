import { cookies } from 'next/headers';

import { BookSearchParams } from '@/common/types/api/book/book-search-params.type';
import BookSearchContainer from '@/containers/book-search.container';
import { favouriteBookHttpClient } from '@/lib/http/favourite-book.http';

interface FavouriteBookFetchContainerProps {
  searchParams: BookSearchParams;
}

export default async function FavouriteBookFetchContainer({
  searchParams,
}: FavouriteBookFetchContainerProps) {
  const cookieStore = cookies();
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
