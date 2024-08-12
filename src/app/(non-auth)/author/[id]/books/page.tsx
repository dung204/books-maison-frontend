import { Metadata } from 'next';

import { BookSearchParams } from '@/common/types/api/book/book-search-params.type';
import { TabsContent } from '@/components/ui/tabs';
import BookSearchContainer from '@/containers/book-search.container';
import { authorHttpClient } from '@/lib/http/author.http';
import { bookHttpClient } from '@/lib/http/book.http';

type AuthorBooksSearchParams = Omit<BookSearchParams, 'authorName'>;

interface AuthorBooksPageProps {
  params: {
    id: string;
  };
  searchParams: AuthorBooksSearchParams;
}

export const revalidate = 60;

export async function generateMetadata({
  params: { id },
}: AuthorBooksPageProps): Promise<Metadata> {
  const { data: author } = await authorHttpClient.getAuthorById(id);

  return {
    title: `${author.name}'s books`,
  };
}

export default async function AuthorBooksPage({
  params: { id },
  searchParams,
}: AuthorBooksPageProps) {
  const { data: author } = await authorHttpClient.getAuthorById(id);
  const { data: books, pagination } = await bookHttpClient.getAllBooks({
    ...searchParams,
    authorName: author.name,
  });

  return (
    <TabsContent value={`/author/${id}/books`} className="outline-none">
      <BookSearchContainer
        books={books}
        pagination={pagination}
        searchParams={{ ...searchParams, authorName: author.name }}
        advancedFilterHiddenFields={['authorName']}
      />
    </TabsContent>
  );
}
