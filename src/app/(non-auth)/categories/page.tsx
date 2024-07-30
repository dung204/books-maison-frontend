import axios from 'axios';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import banner from '@/assets/images/library-banner-1.jpg';
import { Category } from '@/common/types/api/category.type';
import { CommonSearchParams } from '@/common/types/common-search-params.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { PaginationUtils } from '@/common/utils/pagination.util';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import HomeBanner from '@/components/ui/home-banner';
import PaginationContainer from '@/containers/pagination.container';

interface CategoriesPageProps {
  searchParams: CommonSearchParams;
}

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Categories',
};

export default async function CategoriesPage({
  searchParams: { page, pageSize },
}: CategoriesPageProps) {
  if (
    !page ||
    !pageSize ||
    !PaginationUtils.isValidPageNumber(page) ||
    !PaginationUtils.isValidPageSize(pageSize)
  ) {
    redirect(
      `/categories?page=${PaginationUtils.DEFAULT_PAGE}&pageSize=${PaginationUtils.DEFAULT_PAGE_SIZE}`,
    );
  }

  const { data: categories, pagination } = await getCategories({
    page,
    pageSize,
  });

  if (pagination!.totalPage !== 0 && +page > pagination!.totalPage) {
    redirect(`/categories?page=${pagination!.totalPage}&pageSize=${pageSize}`);
  }

  return (
    <>
      <HomeBanner className="h-[400px]" bannerTitle="Categories" />
      <div className="container py-10">
        <section>
          <PaginationContainer pagination={pagination!} />
        </section>
        <section className="mt-10 grid grid-cols-3 gap-8">
          {categories.map(({ id, name }) => (
            <Link
              href={`/search?categoryId=${encodeURIComponent(id)}`}
              key={id}
              className="group"
            >
              <Card className="relative h-44 w-full overflow-hidden">
                <div className="absolute left-0 top-0 z-20 h-full w-full bg-black/50"></div>
                <Image
                  src={banner}
                  alt="banner"
                  fill
                  className="z-10 object-cover transition-all duration-300 group-hover:scale-110"
                />
                <CardHeader className="absolute top-1/2 z-30 w-full -translate-y-1/2 text-white">
                  <CardTitle className="text-center">{name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}

async function getCategories({
  page,
  pageSize,
  orderBy,
  order,
}: CommonSearchParams) {
  const requestUrl = new URL(
    `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/categories`,
  );

  if (page) requestUrl.searchParams.append('page', `${page}`);
  if (pageSize) requestUrl.searchParams.append('pageSize', `${pageSize}`);
  if (orderBy) requestUrl.searchParams.append('orderBy', `${orderBy}`);
  if (order) requestUrl.searchParams.append('order', `${order}`);

  const res = await axios.get<SuccessResponse<Category[]>>(requestUrl.href);
  return res.data;
}
