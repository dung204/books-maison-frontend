import { UserPen } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import HomeBanner from '@/components/ui/home-banner';
import { TabsContainer } from '@/containers';
import { authorHttpClient } from '@/lib/http';

interface AuthorDetailsLayoutProps extends PropsWithChildren {
  params: Promise<{ id: string }>;
}

export default async function AuthorDetailsLayout({
  params,
  children,
}: AuthorDetailsLayoutProps) {
  const { id } = await params;
  const { data: author } = await authorHttpClient.getAuthorById(id);

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
