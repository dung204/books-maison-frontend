import axios from 'axios';
import { Filter, UserPen } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Author } from '@/common/types/api/author.type';
import { PaginationSearchParams } from '@/common/types/pagination-search-params.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { PaginationUtils } from '@/common/utils/pagination.util';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import HomeBanner from '@/components/ui/home-banner';
import PaginationContainer from '@/containers/pagination.container';

export const metadata: Metadata = {
  title: 'Authors',
};

interface AuthorsPageProps {
  searchParams: PaginationSearchParams;
}

export default async function AuthorsPage({
  searchParams: { page, pageSize },
}: AuthorsPageProps) {
  if (
    !page ||
    !pageSize ||
    !PaginationUtils.isValidPageNumber(page) ||
    !PaginationUtils.isValidPageSize(pageSize)
  ) {
    redirect(
      `/authors?page=${PaginationUtils.DEFAULT_PAGE}&pageSize=${PaginationUtils.DEFAULT_PAGE_SIZE}`,
    );
  }

  const { data: authors, pagination } = await getAuthors({
    page,
    pageSize,
  });

  if (pagination!.totalPage !== 0 && +page > pagination!.totalPage) {
    redirect(`/authors?page=${pagination!.totalPage}&pageSize=${pageSize}`);
  }

  return (
    <>
      <HomeBanner className="h-[400px]" bannerTitle="Authors" />
      <div className="container py-10">
        <section>
          <PaginationContainer pagination={pagination!} />
        </section>
        <section className="mt-10 grid grid-cols-4 place-items-center gap-x-8 gap-y-12">
          {authors.map(({ id, imageUrl, name }) => (
            <Link
              key={id}
              href={`/author/${id}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="h-40 w-40">
                {imageUrl && <AvatarImage src={imageUrl} />}
                <AvatarFallback>
                  <UserPen className="h-20 w-20" />
                </AvatarFallback>
              </Avatar>
              <p className="mt-6 text-center text-xl">{name}</p>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}

async function getAuthors({
  page,
  pageSize,
  orderBy,
  order,
}: PaginationSearchParams) {
  const requestUrl = new URL(
    `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/authors`,
  );

  if (page) requestUrl.searchParams.append('page', `${page}`);
  if (pageSize) requestUrl.searchParams.append('pageSize', `${pageSize}`);
  if (orderBy) requestUrl.searchParams.append('orderBy', `${orderBy}`);
  if (order) requestUrl.searchParams.append('order', `${order}`);

  const res = await axios.get<SuccessResponse<Author[]>>(requestUrl.href);
  return res.data;
}
