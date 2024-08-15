'use client';

import { ComponentProps, useState } from 'react';

import { BookAdvancedFilterField } from '@/common/types/api/book/book-advanced-filter-field.type';
import { BookSearchParams } from '@/common/types/api/book/book-search-params.type';
import { Book } from '@/common/types/api/book/book.type';
import { Pagination } from '@/common/types/pagination.type';
import BookCard from '@/components/ui/book-card';
import BooksGridLoading from '@/components/ui/books-grid-loading';
import BookAdvancedFilterContainer from '@/containers/book-advanced-filter.container';
import PaginationContainer from '@/containers/pagination.container';
import SearchBarContainer from '@/containers/search-bar.container';

interface BookSearchContainerProps extends ComponentProps<'div'> {
  books: Book[];
  pagination: Pagination;
  searchParams: BookSearchParams;
  advancedFilterHiddenFields?: BookAdvancedFilterField[];
}

export default function BookSearchContainer({
  books,
  pagination,
  searchParams,
  advancedFilterHiddenFields,
}: BookSearchContainerProps) {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <section className="flex justify-between">
        <div className="w-1/2">
          <SearchBarContainer
            fieldName="title"
            placeholder="Enter a book title to search..."
            onStartLoading={() => setLoading(true)}
            onEndLoading={() => setLoading(false)}
          />
          {searchParams.title && (
            <p className="mt-3">
              Showing books containing title:{' '}
              <b>&quot;{searchParams.title}&quot;</b>
            </p>
          )}
        </div>
        <BookAdvancedFilterContainer
          searchParams={searchParams}
          hiddenFields={advancedFilterHiddenFields}
          onStartLoading={() => setLoading(true)}
          onEndLoading={() => setLoading(false)}
        />
      </section>
      {books.length !== 0 && (
        <section className="mt-6">
          <PaginationContainer
            pagination={pagination}
            onStartLoading={() => setLoading(true)}
            onEndLoading={() => setLoading(false)}
          />
        </section>
      )}
      <section className="mt-10 grid grid-cols-3 gap-8">
        {loading ? (
          <BooksGridLoading />
        ) : books.length === 0 ? (
          <p className="col-span-3 text-center">No books found</p>
        ) : (
          books.map(book => <BookCard key={book.id} book={book} />)
        )}
      </section>
    </div>
  );
}
