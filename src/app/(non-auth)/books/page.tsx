import { randomUUID } from 'crypto';
import { type Metadata } from 'next';
import { Suspense } from 'react';

import { BookSearchParams } from '@/common/types/api/book/book-search-params.type';
import BooksGridLoading from '@/components/ui/books-grid-loading';
import HomeBanner from '@/components/ui/home-banner';
import GeneralBookFetchContainer from '@/containers/general-book-fetch.container';

interface BooksPageProps {
  searchParams: BookSearchParams;
}

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Books',
};

export default async function BooksPage({ searchParams }: BooksPageProps) {
  return (
    <>
      <HomeBanner
        className="h-[400px]"
        bannerTitle="Search for a decent book here at Books Maison"
      />
      <div className="container py-10">
        <Suspense key={randomUUID()} fallback={<BooksGridLoading />}>
          <GeneralBookFetchContainer searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
