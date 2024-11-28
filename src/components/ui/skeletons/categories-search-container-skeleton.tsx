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
        <div className="w-1/2">
          <SearchBarSkeleton />
        </div>
      </section>
      <PaginationContainerSkeleton className="mt-6" />
      <section className={cn('grid grid-cols-3 gap-8', className)} {...props}>
        {Array.from({ length: 9 }).map((_, index) => (
          <Card key={index} className="h-44 w-full">
            <Skeleton className="h-full w-full" />
          </Card>
        ))}
      </section>
    </>
  );
}
