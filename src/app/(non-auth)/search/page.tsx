import axios from 'axios';
import { Info, List, Search, UserPen } from 'lucide-react';
import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import placeholderImg from '@/assets/images/placeholder-200x300.svg';
import { Book } from '@/common/types/api/book.type';
import { CommonSearchParams } from '@/common/types/common-search-params.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { PaginationUtils } from '@/common/utils/pagination.util';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HomeBanner from '@/components/ui/home-banner';
import { Input } from '@/components/ui/input';
import BookFilterContainer from '@/containers/book-filter.container';
import { BookAdvancedFilterData } from '@/containers/book-filter.container';
import PaginationContainer from '@/containers/pagination.container';

export type BookSearchParams = CommonSearchParams &
  Partial<Omit<BookAdvancedFilterData, 'categoryIds'>> & {
    title?: string;
    categoryId?: string[];
  };
interface SearchPageProps {
  searchParams: BookSearchParams;
}

export const revalidate = 0;

export async function generateMetadata({
  searchParams: { title },
}: SearchPageProps): Promise<Metadata> {
  return {
    title: `Searching "${title}" books`,
  };
}

export default async function SearchPage({
  searchParams: { page, pageSize, title, order, orderBy, ...otherSearchParams },
}: SearchPageProps) {
  if (
    !page ||
    !pageSize ||
    !PaginationUtils.isValidPageNumber(page) ||
    !PaginationUtils.isValidPageSize(pageSize)
  ) {
    redirect(
      `/search?title=${typeof title !== 'string' ? '' : title}&page=${PaginationUtils.DEFAULT_PAGE}&pageSize=${PaginationUtils.DEFAULT_PAGE_SIZE}`,
    );
  }

  const { data: books, pagination } = await getBooks({
    page,
    pageSize,
    title,
    order,
    orderBy,
    ...otherSearchParams,
  });

  if (pagination!.totalPage !== 0 && +page > pagination!.totalPage) {
    redirect(
      `/search?page=${pagination!.totalPage}&pageSize=${pageSize}&title=${title}`,
    );
  }

  const handleSearchByTitle = async (formData: FormData) => {
    'use server';
    const searchTitle = formData.get('title');
    redirect(`/search?title=${searchTitle}`);
  };

  return (
    <>
      <HomeBanner
        className="h-[400px]"
        bannerTitle="Search for a decent book here at Books Maison"
      />
      <div className="container py-10">
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
              Showing books containing title:{' '}
              <span className="font-bold">&quot;{title}&quot;</span>
            </p>
          </div>
          <BookFilterContainer searchParams={otherSearchParams} />
        </section>
        {books.length !== 0 && (
          <section className="mt-6">
            <PaginationContainer pagination={pagination!} />
          </section>
        )}
        <section className="mt-10 grid grid-cols-4 gap-8">
          {books.length === 0 ? (
            <p className="col-span-4 text-center">No books found</p>
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
  if (categoryId)
    categoryId.forEach(id => requestUrl.searchParams.append('categoryId', id));

  const res = await axios.get<SuccessResponse<Book[]>>(requestUrl.href);
  return res.data;
}
