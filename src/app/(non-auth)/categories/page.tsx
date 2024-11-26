import { randomUUID } from 'crypto';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { CategorySearchParams } from '@/common/types/api/category';
import HomeBanner from '@/components/ui/home-banner';
import { CategoriesGridSkeleton } from '@/components/ui/skeletons';
import { CategorySearchContainer } from '@/containers/category';
import { categoryHttpClient } from '@/lib/http';

interface CategoriesPageProps {
  searchParams: Promise<CategorySearchParams>;
}

interface CategoryFetchContainerProps {
  searchParams: CategorySearchParams;
}

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Categories',
};

export default async function CategoriesPage(props: CategoriesPageProps) {
  const searchParams = await props.searchParams;

  return (
    <>
      <HomeBanner className="h-[400px]" bannerTitle="Categories" />
      <div className="container py-10">
        <Suspense key={randomUUID()} fallback={<CategoriesGridSkeleton />}>
          <CategoryFetch searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}

async function CategoryFetch({ searchParams }: CategoryFetchContainerProps) {
  const { data: categories, pagination } =
    await categoryHttpClient.getAllCategories(searchParams);

  return (
    <CategorySearchContainer
      categories={categories}
      pagination={pagination}
      searchParams={searchParams}
    />
  );
}
