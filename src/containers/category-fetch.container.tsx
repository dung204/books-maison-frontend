import { CategorySearchParams } from '@/common/types/api/category/category-search-params.type';
import CategorySearchContainer from '@/containers/category-search.container';
import { categoryHttpClient } from '@/lib/http/category.http';

interface CategoryFetchContainerProps {
  searchParams: CategorySearchParams;
}

export default async function CategoryFetchContainer({
  searchParams,
}: CategoryFetchContainerProps) {
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
