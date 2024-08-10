import { Metadata } from 'next';

import { CategorySearchParams } from '@/common/types/api/category/category-search-params.type';
import HomeBanner from '@/components/ui/home-banner';
import CategorySearchContainer from '@/containers/category-search.container';
import { categoryHttpClient } from '@/lib/http/category.http';

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
  const { data: categories, pagination } =
    await categoryHttpClient.getAllCategories(searchParams);

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
