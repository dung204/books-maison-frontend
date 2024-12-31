import type { ComponentProps } from 'react';

import { Card } from '@/components/ui/cards';
import {
  PaginationContainerSkeleton,
  SearchBarSkeleton,
  Skeleton,
} from '@/components/ui/skeletons';
import { cn } from '@/lib/cn';

interface CategoriesGridSkeletonProps extends ComponentProps<'section'> {}

export function CategoriesSearchContainerSkeleton({
  className,
  ...props
}: CategoriesGridSkeletonProps) {
  return (
    <>
      <section className="flex justify-between">
        <div className="w-full md:w-2/3 xl:w-1/2">
          <SearchBarSkeleton />
        </div>
      </section>
      <PaginationContainerSkeleton className="mt-6" />
      <section
        className={cn(
          'mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3',
          className,
        )}
        {...props}
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <Card key={index} className="h-44 w-full">
            <Skeleton className="h-full w-full" />
          </Card>
        ))}
      </section>
    </>
  );
}
