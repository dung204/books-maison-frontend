import { AuthorSearchParams } from '@/common/types/api/author/author-search-params.type';
import AuthorSearchContainer from '@/containers/author-search.container';
import { authorHttpClient } from '@/lib/http/author.http';

interface AuthorFetchContainerProps {
  searchParams: AuthorSearchParams;
}

export default async function AuthorFetchContainer({
  searchParams,
}: AuthorFetchContainerProps) {
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
