import axios from 'axios';
import Link from 'next/link';

import { Author } from '@/common/types/api/author.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface AuthorBioPageProps {
  params: {
    id: string;
  };
}

export const revalidate = 30;

export default async function AuthorBioPage({
  params: { id },
}: AuthorBioPageProps) {
  const author = await getAuthor(id);

  return (
    <Tabs className="w-full" defaultValue="bio">
      <TabsList className="mb-6 grid w-full grid-cols-3">
        <Link href={`/author/${id}`}>
          <TabsTrigger value="overview" className="w-full">
            Overview
          </TabsTrigger>
        </Link>
        <Link href={`/author/${id}/bio`}>
          <TabsTrigger value="bio" className="w-full">
            Biography
          </TabsTrigger>
        </Link>
        <Link href={`/author/${id}/books?title=&page=1&pageSize=10`}>
          <TabsTrigger value="books" className="w-full">
            Books
          </TabsTrigger>
        </Link>
      </TabsList>

      <p className={cn({ 'text-center': !author.biography })}>
        {author.biography || 'No biography available'}
      </p>
    </Tabs>
  );
}

async function getAuthor(id: string) {
  const requestUrl = new URL(
    `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/authors/${id}`,
  );
  const res = await axios.get<SuccessResponse<Author>>(requestUrl.href);
  return res.data.data;
}
