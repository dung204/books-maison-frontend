import axios from 'axios';
import { UserPen } from 'lucide-react';
import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import { Author } from '@/common/types/api/author.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import HomeBanner from '@/components/ui/home-banner';
import TabsContainer from '@/containers/tabs.container';

interface AuthorDetailsLayoutProps extends PropsWithChildren {
  params: { id: string };
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
        <div className="col-span-9">
          <TabsContainer
            tabs={[
              { href: `/author/${id}`, label: 'Overview' },
              { href: `/author/${id}/bio`, label: 'Biography' },
              { href: `/author/${id}/books`, label: 'Books' },
            ]}
          >
            {children}
          </TabsContainer>
        </div>
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
