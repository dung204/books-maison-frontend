import axios from 'axios';
import { Metadata } from 'next';

import { BookSearchParams } from '@/app/(non-auth)/books/page';
import { Author } from '@/common/types/api/author.type';
import { Book } from '@/common/types/api/book.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { TabsContent } from '@/components/ui/tabs';
import BookSearchContainer from '@/containers/book-search.container';

type AuthorBooksSearchParams = Omit<BookSearchParams, 'authorName'>;

interface AuthorBooksPageProps {
  params: {
    id: string;
  };
  searchParams: AuthorBooksSearchParams;
}

export const revalidate = 0;

export async function generateMetadata({
  params: { id },
}: AuthorBooksPageProps): Promise<Metadata> {
  const author = await getAuthor(id);

  return {
    title: `${author.name}'s books`,
  };
}

export default async function AuthorBooksPage({
  params: { id },
  searchParams,
}: AuthorBooksPageProps) {
  const author = await getAuthor(id);
  const { data: books, pagination } = await getBooksByAuthorName({
    ...searchParams,
    authorName: author.name,
  });

  return (
    <TabsContent value={`/author/${id}/books`} className="outline-none">
      <BookSearchContainer
        books={books}
        pagination={pagination}
        searchParams={{ ...searchParams, authorName: author.name }}
        advancedFilterHiddenFields={['authorName']}
      />
    </TabsContent>
  );
}

async function getAuthor(id: string) {
  const requestUrl = new URL(
    `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/authors/${id}`,
  );
  const res = await axios.get<SuccessResponse<Author>>(requestUrl.href);
  return res.data.data;
}

async function getBooksByAuthorName({
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

  requestUrl.searchParams.append('authorName', `${authorName!}`);

  if (page) requestUrl.searchParams.append('page', `${page}`);
  if (pageSize) requestUrl.searchParams.append('pageSize', `${pageSize}`);
  if (orderBy) requestUrl.searchParams.append('orderBy', `${orderBy}`);
  if (order) requestUrl.searchParams.append('order', `${order}`);
  if (title) requestUrl.searchParams.append('title', `${title}`);
  if (publisher) requestUrl.searchParams.append('publisher', `${publisher}`);
  if (publishedYearFrom)
    requestUrl.searchParams.append('publishedYearFrom', `${publishedYearFrom}`);
  if (publishedYearTo)
    requestUrl.searchParams.append('publishedYearTo', `${publishedYearTo}`);
  if (minPages) requestUrl.searchParams.append('minPages', `${minPages}`);
  if (maxPages) requestUrl.searchParams.append('maxPages', `${maxPages}`);
  if (categoryId) {
    if (Array.isArray(categoryId))
      categoryId.forEach(id =>
        requestUrl.searchParams.append('categoryId', id),
      );
    else requestUrl.searchParams.append('categoryId', categoryId);
  }

  const res = await axios.get<SuccessResponse<Book[]>>(requestUrl.href);
  return res.data;
}
