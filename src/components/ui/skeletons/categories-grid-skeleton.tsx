import { ComponentProps } from 'react';

import { Card } from '@/components/ui/cards';
import { Skeleton } from '@/components/ui/skeletons';
import { cn } from '@/lib/cn';

interface CategoriesGridSkeletonProps extends ComponentProps<'section'> {}

export function CategoriesGridSkeleton({
  className,
  ...props
}: CategoriesGridSkeletonProps) {
  return (
    <section className={cn('grid grid-cols-3 gap-8', className)} {...props}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Card key={index} className="h-44 w-full">
          <Skeleton className="h-full w-full" />
        </Card>
      ))}
    </section>
  );
}
