import { type Metadata } from 'next';

import { BookSearchParams } from '@/common/types/api/book/book-search-params.type';
import HomeBanner from '@/components/ui/home-banner';
import BookSearchContainer from '@/containers/book-search.container';
import { bookHttpClient } from '@/lib/http/book.http';

interface SearchPageProps {
  searchParams: BookSearchParams;
}

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Books',
};

export default async function BooksPage({ searchParams }: SearchPageProps) {
  const { data: books, pagination } =
    await bookHttpClient.getAllBooks(searchParams);

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
