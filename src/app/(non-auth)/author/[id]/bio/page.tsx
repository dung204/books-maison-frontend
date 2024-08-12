import { Metadata } from 'next';

import { TabsContent } from '@/components/ui/tabs';
import { authorHttpClient } from '@/lib/http/author.http';
import { cn } from '@/lib/utils';

interface AuthorBioPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: AuthorBioPageProps): Promise<Metadata> {
  const { data: author } = await authorHttpClient.getAuthorById(id);

  return {
    title: `${author.name}'s biography`,
  };
}

export const revalidate = 30;

export default async function AuthorBioPage({
  params: { id },
}: AuthorBioPageProps) {
  const { data: author } = await authorHttpClient.getAuthorById(id);

  return (
    <TabsContent value={`/author/${id}/bio`}>
      <p className={cn({ 'text-center': !author.biography })}>
        {author.biography || 'No biography available'}
      </p>
    </TabsContent>
  );
}
