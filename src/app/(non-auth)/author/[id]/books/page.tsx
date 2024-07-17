import axios from 'axios';
import { Info, List, Search, UserPen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { BookSearchParams } from '@/app/(non-auth)/search/page';
import placeholderImg from '@/assets/images/placeholder-200x300.svg';
import { Author } from '@/common/types/api/author.type';
import { Book } from '@/common/types/api/book.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { PaginationUtils } from '@/common/utils/pagination.util';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookFilterContainer from '@/containers/book-filter.container';
import PaginationContainer from '@/containers/pagination.container';

type AuthorBooksSearchParams = Omit<BookSearchParams, 'authorName'>;

interface AuthorBooksPageProps {
  params: {
    id: string;
  };
  searchParams: AuthorBooksSearchParams;
}

export const revalidate = 0;

export default async function AuthorBooksPage({
  params: { id },
  searchParams: { page, pageSize, title, order, orderBy, ...otherSearchParams },
}: AuthorBooksPageProps) {
  if (
    !page ||
    !pageSize ||
    !PaginationUtils.isValidPageNumber(page) ||
    !PaginationUtils.isValidPageSize(pageSize)
  ) {
    redirect(
      `/author/${id}/books?title=${typeof title !== 'string' ? '' : title}&page=${PaginationUtils.DEFAULT_PAGE}&pageSize=${PaginationUtils.DEFAULT_PAGE_SIZE}`,
    );
  }

  const author = await getAuthor(id);
  const { data: books, pagination } = await getBooksByAuthorName({
    page,
    pageSize,
    title,
    order,
    orderBy,
    authorName: author.name,
    ...otherSearchParams,
  });

  if (pagination!.totalPage !== 0 && +page > pagination!.totalPage) {
    redirect(
      `/author/${id}/books?page=${pagination!.totalPage}&pageSize=${pageSize}&title=${title}`,
    );
  }

  const handleSearchByTitle = async (formData: FormData) => {
    'use server';
    const searchTitle = formData.get('title');
    redirect(`/author/${id}/books?title=${searchTitle}`);
  };

  return (
    <Tabs className="w-full" defaultValue="books">
      <TabsList className="mb-6 grid w-full grid-cols-3">
        <Link href={`/author/${id}`}>
          <TabsTrigger value="overview" className="w-full">
            Overview
          </TabsTrigger>
        </Link>
        <Link href={`/author/${id}/bio`}>
          <TabsTrigger value="bio" className="w-full">
            Biography
          </TabsTrigger>
        </Link>
        <Link href={`/author/${id}/books?title=&page=1&pageSize=10`}>
          <TabsTrigger value="books" className="w-full">
            Books
          </TabsTrigger>
        </Link>
      </TabsList>

      <div>
        <section className="flex justify-between">
          <div className="w-1/2">
            <form
              action={handleSearchByTitle}
              className="grid grid-cols-6 gap-4"
            >
              <div className="relative col-span-5">
                <Input
                  type="text"
                  placeholder="Enter a book title to search..."
                  className="rounded-full ps-10"
                  id="search-bar"
                  name="title"
                />
                <label
                  htmlFor="search-bar"
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                >
                  <Search className="h-6 w-6" />
                </label>
              </div>
              <Button type="submit" className="col-span-1">
                Search
              </Button>
            </form>
            <p className="mt-3">
              Showing books of <span className="font-bold">{author.name}</span>{' '}
              containing title:{' '}
              <span className="font-bold">&quot;{title}&quot;</span>
            </p>
          </div>
          <BookFilterContainer
            searchParams={{ authorName: author.name, ...otherSearchParams }}
            hiddenFields={['authorName']}
          />
        </section>
        {books.length !== 0 && (
          <section className="mt-6">
            <PaginationContainer pagination={pagination!} />
          </section>
        )}
        <section className="mt-10 grid grid-cols-3 gap-8">
          {books.length === 0 ? (
            <p className="col-span-3 text-center">No books found</p>
          ) : (
            books.map(book => (
              <Link key={book.id} href={`/book/${book.id}`} className="group">
                <Card className="overflow-hidden">
                  <div className="relative h-[300px] overflow-hidden">
                    <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/50 opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <Button variant="secondary">See Details</Button>
                    </div>
                    <Image
                      src={book.imageUrl || placeholderImg}
                      alt=""
                      className="mx-auto object-contain transition-all duration-300 group-hover:scale-125"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1 h-[1.2lh]">
                      {book.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex h-[9lh] flex-col gap-2">
                    <div className="line-clamp-2">
                      <UserPen className="me-2 inline-block h-4 w-4 -translate-y-[0.1rem]" />
                      <span>
                        {book.authors.length === 0
                          ? 'Updating...'
                          : book.authors.map(author => author.name).join(', ')}
                      </span>
                    </div>
                    <div className="line-clamp-2">
                      <List className="me-2 inline-block h-4 w-4 -translate-y-[0.1rem]" />
                      <span>
                        {book.categories.length === 0
                          ? 'Updating...'
                          : book.categories
                              .map(category => category.name)
                              .join(', ')}
                      </span>
                    </div>
                    <div className="line-clamp-3">
                      <Info className="me-2 inline-block h-4 w-4 -translate-y-[0.1rem]" />
                      <span>{book.description || 'Updating...'}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </section>
      </div>
    </Tabs>
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
  if (categoryId)
    categoryId.forEach(id => requestUrl.searchParams.append('categoryId', id));

  const res = await axios.get<SuccessResponse<Book[]>>(requestUrl.href);
  return res.data;
}
