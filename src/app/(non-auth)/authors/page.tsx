import { randomUUID } from 'crypto';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import type { AuthorSearchParams } from '@/common/types/api/author';
import HomeBanner from '@/components/ui/home-banner';
import { AuthorsSearchContainerSkeleton } from '@/components/ui/skeletons';
import { AuthorSearchContainer } from '@/containers/author';
import { authorHttpClient } from '@/lib/http';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Authors',
};

interface AuthorsPageProps {
  searchParams: Promise<AuthorSearchParams>;
}

interface AuthorFetchContainerProps {
  searchParams: AuthorSearchParams;
}

export default async function AuthorsPage(props: AuthorsPageProps) {
  const searchParams = await props.searchParams;
  return (
    <>
      <HomeBanner className="h-[400px]" bannerTitle="Authors" />
      <div className="container py-10">
        <Suspense
          key={randomUUID()}
          fallback={<AuthorsSearchContainerSkeleton />}
        >
          <AuthorFetch searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}

async function AuthorFetch({ searchParams }: AuthorFetchContainerProps) {
  const { data: authors, pagination } =
    await authorHttpClient.getAllAuthors(searchParams);

  return (
    <AuthorSearchContainer
      authors={authors}
      pagination={pagination}
      searchParams={searchParams}
    />
  );
}
