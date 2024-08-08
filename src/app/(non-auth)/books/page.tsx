import axios from 'axios';
import { type Metadata } from 'next';

import { Book } from '@/common/types/api/book.type';
import { CommonSearchParams } from '@/common/types/common-search-params.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import HomeBanner from '@/components/ui/home-banner';
import { BookAdvancedFilterData } from '@/containers/book-advanced-filter.container';
import BookSearchContainer from '@/containers/book-search.container';

export type BookSearchParams = CommonSearchParams &
  Partial<Omit<BookAdvancedFilterData, 'categoryIds'>> & {
    title?: string;
    categoryId?: string | string[];
  };
interface SearchPageProps {
  searchParams: BookSearchParams;
}

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Books',
};

export default async function BooksPage({ searchParams }: SearchPageProps) {
  const { data: books, pagination } = await getBooks(searchParams);

  return (
    <>
      <HomeBanner
        className="h-[400px]"
        bannerTitle="Search for a decent book here at Books Maison"
      />
      <div className="container py-10">
        <BookSearchContainer
          books={books}
          pagination={pagination}
          searchParams={searchParams}
        />
      </div>
    </>
  );
}

async function getBooks({
  page,
  pageSize,
  orderBy,
  order,
  title,
  authorName,
  publisher,
  publishedYearFrom,
  publishedYearTo,
  minPages,
  maxPages,
  categoryId,
}: BookSearchParams) {
  const requestUrl = new URL(
    `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/books`,
  );

  if (page) requestUrl.searchParams.append('page', `${page}`);
  if (pageSize) requestUrl.searchParams.append('pageSize', `${pageSize}`);
  if (orderBy) requestUrl.searchParams.append('orderBy', `${orderBy}`);
  if (order) requestUrl.searchParams.append('order', `${order}`);
  if (title) requestUrl.searchParams.append('title', `${title}`);
  if (authorName) requestUrl.searchParams.append('authorName', `${authorName}`);
  if (publisher) requestUrl.searchParams.append('publisher', `${publisher}`);
  if (publishedYearFrom)
    requestUrl.searchParams.append('publishedYearFrom', `${publishedYearFrom}`);
  if (publishedYearTo)
    requestUrl.searchParams.append('publishedYearTo', `${publishedYearTo}`);
  if (minPages) requestUrl.searchParams.append('minPages', `${minPages}`);
  if (maxPages) requestUrl.searchParams.append('maxPages', `${maxPages}`);
  if (categoryId) {
    if (Array.isArray(categoryId)) {
      categoryId.forEach(id => {
        requestUrl.searchParams.append('categoryId', id);
      });
    } else {
      requestUrl.searchParams.append('categoryId', categoryId);
    }
  }

  const res = await axios.get<SuccessResponse<Book[]>>(requestUrl.href);
  return res.data;
}
