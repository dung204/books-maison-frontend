import { TabsContent } from '@radix-ui/react-tabs';
import axios from 'axios';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { BookSearchParams } from '@/app/(non-auth)/search/page';
import { Book } from '@/common/types/api/book.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import BookSearchContainer from '@/containers/book-search.container';

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
  const { data: books, pagination } = await getFavouriteBooks(
    accessToken!,
    searchParams,
  );

  return (
    <TabsContent value="/me/favourite-books">
      <BookSearchContainer
        books={books}
        pagination={pagination}
        searchParams={searchParams}
      />
    </TabsContent>
  );
}

async function getFavouriteBooks(
  accessToken: string,
  searchParams?: BookSearchParams,
) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/favourite-books/me`,
  );

  if (searchParams) {
    searchParams.page && url.searchParams.append('page', searchParams.page);
    searchParams.pageSize &&
      url.searchParams.append('pageSize', searchParams.pageSize);
    searchParams.orderBy &&
      url.searchParams.append('orderBy', searchParams.orderBy);
    searchParams.order && url.searchParams.append('order', searchParams.order);
    searchParams.title && url.searchParams.append('title', searchParams.title);
    searchParams.authorName &&
      url.searchParams.append('authorName', searchParams.authorName);
    searchParams.categoryId &&
      searchParams.categoryId.forEach(id =>
        url.searchParams.append('categoryId', id),
      );
    searchParams.publisher &&
      url.searchParams.append('publisher', searchParams.publisher);
    searchParams.publishedYearFrom &&
      url.searchParams.append(
        'publishedYearFrom',
        searchParams.publishedYearFrom,
      );
    searchParams.publishedYearTo &&
      url.searchParams.append('publishedYearTo', searchParams.publishedYearTo);
    searchParams.minPages &&
      url.searchParams.append('minPages', searchParams.minPages);
    searchParams.maxPages &&
      url.searchParams.append('maxPages', searchParams.maxPages);
  }

  const res = await axios.get<SuccessResponse<Book[]>>(url.href, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
}
