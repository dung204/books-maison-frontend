import { Metadata } from 'next';

import { TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/cn';
import { authorHttpClient } from '@/lib/http';

interface AuthorBioPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: AuthorBioPageProps): Promise<Metadata> {
  const { id } = await params;
  const { data: author } = await authorHttpClient.getAuthorById(id);

  return {
    title: `${author.name}'s biography`,
  };
}

export const revalidate = 30;

export default async function AuthorBioPage({ params }: AuthorBioPageProps) {
  const { id } = await params;
  const { data: author } = await authorHttpClient.getAuthorById(id);

  return (
    <TabsContent value={`/author/${id}/bio`}>
      <p className={cn({ 'text-center': !author.biography })}>
        {author.biography || 'No biography available'}
      </p>
    </TabsContent>
  );
}
