'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';

import { BookSearchParams } from '@/app/(non-auth)/books/page';
import { Book } from '@/common/types/api/book.type';
import { Pagination } from '@/common/types/pagination.type';
import BookCard from '@/components/ui/book-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BookFilterContainer from '@/containers/book-filter.container';
import PaginationContainer from '@/containers/pagination.container';

interface BookSearchContainerProps extends ComponentProps<'div'> {
  books: Book[];
  pagination: Pagination;
  searchParams: BookSearchParams;
}

export default function BookSearchContainer({
  books,
  pagination,
  searchParams,
}: BookSearchContainerProps) {
  const router = useRouter();

  const handleSearchByTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const url = new URL(location.href);
    url.searchParams.set('title', title);
    router.push(url.toString());
  };

  return (
    <div>
      <section className="flex justify-between">
        <div className="w-1/2">
          <form
            className="grid grid-cols-6 gap-4"
            onSubmit={handleSearchByTitle}
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
            <b>&quot;{searchParams.title || ''}&quot;</b>
          </p>
        </div>
        <BookFilterContainer searchParams={searchParams} />
      </section>
      {books.length !== 0 && (
        <section className="mt-6">
          <PaginationContainer pagination={pagination} />
        </section>
      )}
      <section className="mt-10 grid grid-cols-3 gap-8">
        {books.length === 0 ? (
          <p className="col-span-3 text-center">No books found</p>
        ) : (
          books.map(book => <BookCard key={book.id} book={book} />)
        )}
      </section>
    </div>
  );
}
