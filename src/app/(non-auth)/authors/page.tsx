import { Metadata } from 'next';

import { AuthorSearchParams } from '@/common/types/api/author/author-search-params.type';
import HomeBanner from '@/components/ui/home-banner';
import AuthorSearchContainer from '@/containers/author-search.container';
import { authorHttpClient } from '@/lib/http/author.http';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Authors',
};

interface AuthorsPageProps {
  searchParams: AuthorSearchParams;
}

export default async function AuthorsPage({ searchParams }: AuthorsPageProps) {
  const { data: authors, pagination } =
    await authorHttpClient.getAllAuthors(searchParams);

  return (
    <>
      <HomeBanner className="h-[400px]" bannerTitle="Authors" />
      <div className="container py-10">
        <AuthorSearchContainer
          authors={authors}
          pagination={pagination}
          searchParams={searchParams}
        />
      </div>
    </>
  );
}
