import { ComponentProps } from 'react';

import { Pagination } from '@/common/types';
import {
  Book,
  BookAdvancedFilterField,
  BookSearchParams,
} from '@/common/types/api/book';
import { BookCard } from '@/components/ui/cards';
import { PaginationContainer } from '@/containers';
import { SearchBarContainer } from '@/containers';
import { BookAdvancedFilterContainer } from '@/containers/book';

interface BookSearchContainerProps extends ComponentProps<'div'> {
  books: Book[];
  pagination: Pagination;
  searchParams: BookSearchParams;
  advancedFilterHiddenFields?: BookAdvancedFilterField[];
}

export function BookSearchContainer({
  books,
  pagination,
  searchParams,
  advancedFilterHiddenFields,
}: BookSearchContainerProps) {
  return (
    <div>
      <section className="flex justify-between">
        <div className="w-1/2">
          <SearchBarContainer
            fieldName="title"
            placeholder="Enter a book title to search..."
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
        />
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
