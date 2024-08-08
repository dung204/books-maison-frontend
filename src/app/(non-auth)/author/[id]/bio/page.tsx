import axios from 'axios';
import { Metadata } from 'next';

import { Author } from '@/common/types/api/author.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface AuthorBioPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: AuthorBioPageProps): Promise<Metadata> {
  const author = await getAuthor(id);

  return {
    title: `${author.name}'s biography`,
  };
}

export const revalidate = 30;

export default async function AuthorBioPage({
  params: { id },
}: AuthorBioPageProps) {
  const author = await getAuthor(id);

  return (
    <TabsContent value={`/author/${id}/bio`}>
      <p className={cn({ 'text-center': !author.biography })}>
        {author.biography || 'No biography available'}
      </p>
    </TabsContent>
  );
}

async function getAuthor(id: string) {
  const requestUrl = new URL(
    `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/authors/${id}`,
  );
  const res = await axios.get<SuccessResponse<Author>>(requestUrl.href);
  return res.data.data;
}
