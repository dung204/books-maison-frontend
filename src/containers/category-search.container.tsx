import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';

import { CategorySearchParams } from '@/app/(non-auth)/categories/page';
import banner from '@/assets/images/library-banner-1.jpg';
import { Category } from '@/common/types/api/category.type';
import { Pagination } from '@/common/types/pagination.type';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import PaginationContainer from '@/containers/pagination.container';
import SearchBarContainer from '@/containers/search-bar.container';

interface CategorySearchContainerProps extends ComponentProps<'div'> {
  categories: Category[];
  pagination: Pagination;
  searchParams: CategorySearchParams;
}

export default function CategorySearchContainer({
  categories,
  pagination,
  searchParams,
}: CategorySearchContainerProps) {
  return (
    <div>
      <section className="w-1/2">
        <SearchBarContainer
          fieldName="name"
          placeholder="Enter a category name to search..."
        />
      </section>
      {searchParams.name && (
        <p className="mt-3">
          Showing categories containing name:{' '}
          <b>&quot;{searchParams.name}&quot;</b>
        </p>
      )}
      <section className="mt-6">
        <PaginationContainer pagination={pagination!} />
      </section>
      <section className="mt-10 grid grid-cols-3 gap-8">
        {categories.map(({ id, name }) => (
          <Link
            href={`/books?categoryId=${encodeURIComponent(id)}`}
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
  );
}
