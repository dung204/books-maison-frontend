import { randomUUID } from 'crypto';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { AuthorSearchParams } from '@/common/types/api/author/author-search-params.type';
import AuthorsGridLoading from '@/components/ui/authors-grid-loading';
import HomeBanner from '@/components/ui/home-banner';
import AuthorFetchContainer from '@/containers/author-fetch.container';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Authors',
};

interface AuthorsPageProps {
  searchParams: AuthorSearchParams;
}

export default function AuthorsPage({ searchParams }: AuthorsPageProps) {
  return (
    <>
      <HomeBanner className="h-[400px]" bannerTitle="Authors" />
      <div className="container py-10">
        <Suspense key={randomUUID()} fallback={<AuthorsGridLoading />}>
          <AuthorFetchContainer searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
