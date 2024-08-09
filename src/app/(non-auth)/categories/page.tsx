import axios from 'axios';
import { Metadata } from 'next';

import { Category } from '@/common/types/api/category.type';
import { CommonSearchParams } from '@/common/types/common-search-params.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import HomeBanner from '@/components/ui/home-banner';
import CategorySearchContainer from '@/containers/category-search.container';

export interface CategorySearchParams extends CommonSearchParams {
  name?: string;
}

interface CategoriesPageProps {
  searchParams: CategorySearchParams;
}

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Categories',
};

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const { data: categories, pagination } = await getCategories(searchParams);

  return (
    <>
      <HomeBanner className="h-[400px]" bannerTitle="Categories" />
      <div className="container py-10">
        <CategorySearchContainer
          categories={categories}
          pagination={pagination}
          searchParams={searchParams}
        />
      </div>
    </>
  );
}

async function getCategories({
  page,
  pageSize,
  orderBy,
  order,
  name,
}: CategorySearchParams) {
  const requestUrl = new URL(
    `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/categories`,
  );

  if (page) requestUrl.searchParams.append('page', `${page}`);
  if (pageSize) requestUrl.searchParams.append('pageSize', `${pageSize}`);
  if (orderBy) requestUrl.searchParams.append('orderBy', `${orderBy}`);
  if (order) requestUrl.searchParams.append('order', `${order}`);
  if (name) requestUrl.searchParams.append('name', `${name}`);

  const res = await axios.get<SuccessResponse<Category[]>>(requestUrl.href);
  return res.data;
}
