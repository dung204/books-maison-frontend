import { ComponentProps } from 'react';

import { BookSearchParams } from '@/common/types/api/book/book-search-params.type';
import BookSearchContainer from '@/containers/book-search.container';
import { bookHttpClient } from '@/lib/http/book.http';

interface GlobalBookFetchContainerProps extends ComponentProps<'div'> {
  searchParams: BookSearchParams;
}

export default async function GeneralBookFetchContainer({
  searchParams,
}: GlobalBookFetchContainerProps) {
  const { data: books, pagination } =
    await bookHttpClient.getAllBooks(searchParams);

  return (
    <BookSearchContainer
      books={books}
      pagination={pagination}
      searchParams={searchParams}
    />
  );
}
