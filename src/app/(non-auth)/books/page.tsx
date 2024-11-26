import { randomUUID } from 'crypto';
import { type Metadata } from 'next';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

import { BookSearchParams } from '@/common/types/api/book';
import HomeBanner from '@/components/ui/home-banner';
import { BooksGridSkeleton } from '@/components/ui/skeletons';
import { BookSearchContainer } from '@/containers/book';
import { bookHttpClient } from '@/lib/http';

interface BooksPageProps {
  searchParams: Promise<BookSearchParams>;
}

interface GlobalBookFetchContainerProps {
  searchParams: BookSearchParams;
}

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Books',
};

export default async function BooksPage(props: BooksPageProps) {
  const searchParams = await props.searchParams;
  return (
    <>
      <HomeBanner
        className="h-[400px]"
        bannerTitle="Search for a decent book here at Books Maison"
      />
      <div className="container py-10">
        <Suspense key={randomUUID()} fallback={<BooksGridSkeleton />}>
          <BookFetch searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}

async function BookFetch({ searchParams }: GlobalBookFetchContainerProps) {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get('accessToken')?.value;
  const { data: books, pagination } = await bookHttpClient.getAllBooks(
    searchParams,
    accessToken,
  );

  return (
    <BookSearchContainer
      books={books}
      pagination={pagination}
      searchParams={searchParams}
    />
  );
}
