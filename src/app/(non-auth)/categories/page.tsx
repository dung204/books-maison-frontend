import { randomUUID } from 'crypto';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { CategorySearchParams } from '@/common/types/api/category/category-search-params.type';
import CategoriesGridLoading from '@/components/ui/categories-grid-loading';
import HomeBanner from '@/components/ui/home-banner';
import CategoryFetchContainer from '@/containers/category-fetch.container';

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
  return (
    <>
      <HomeBanner className="h-[400px]" bannerTitle="Categories" />
      <div className="container py-10">
        <Suspense key={randomUUID()} fallback={<CategoriesGridLoading />}>
          <CategoryFetchContainer searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
