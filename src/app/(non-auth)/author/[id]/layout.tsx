import axios from 'axios';
import { UserPen } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { PropsWithChildren, ReactNode } from 'react';

import { Author } from '@/common/types/api/author.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import HomeBanner from '@/components/ui/home-banner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuthorDetailsLayoutProps extends PropsWithChildren {
  params: { id: string };
}

export async function generateMetadata({
  params: { id },
}: AuthorDetailsLayoutProps): Promise<Metadata> {
  const author = await getAuthor(id);

  return {
    title: author.name,
  };
}

export default async function AuthorDetailsLayout({
  children,
  params: { id },
}: AuthorDetailsLayoutProps) {
  const author = await getAuthor(id);

  return (
    <>
      <HomeBanner className="h-[400px]" bannerTitle="Author details" />
      <div className="container grid grid-cols-12 gap-20 py-10">
        <div className="col-span-3 flex flex-col items-center">
          <Avatar className="h-72 w-72">
            {author.imageUrl && <AvatarImage src={author.imageUrl} />}
            <AvatarFallback>
              <UserPen className="h-20 w-20" />
            </AvatarFallback>
          </Avatar>
          <h2 className="mt-6 text-3xl font-semibold">{author.name}</h2>
        </div>
        <div className="col-span-9">{children}</div>
      </div>
    </>
  );
}

async function getAuthor(id: string) {
  const requestUrl = new URL(
    `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/authors/${id}`,
  );
  const res = await axios.get<SuccessResponse<Author>>(requestUrl.href);
  return res.data.data;
}
