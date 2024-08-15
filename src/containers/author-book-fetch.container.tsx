import { BookSearchParams } from '@/common/types/api/book/book-search-params.type';
import BookSearchContainer from '@/containers/book-search.container';
import { authorHttpClient } from '@/lib/http/author.http';
import { bookHttpClient } from '@/lib/http/book.http';

interface AuthorBookFetchContainerProps {
  authorId: string;
  searchParams: BookSearchParams;
}

export default async function AuthorBookFetchContainer({
  authorId,
  searchParams,
}: AuthorBookFetchContainerProps) {
  const { data: author } = await authorHttpClient.getAuthorById(authorId);
  const { data: books, pagination } = await bookHttpClient.getAllBooks({
    ...searchParams,
    authorName: author.name,
  });

  return (
    <BookSearchContainer
      books={books}
      pagination={pagination}
      searchParams={{ ...searchParams, authorName: author.name }}
      advancedFilterHiddenFields={['authorName']}
    />
  );
}
