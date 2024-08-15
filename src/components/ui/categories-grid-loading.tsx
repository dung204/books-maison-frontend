import { ComponentProps } from 'react';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface CategoriesGridLoadingProps extends ComponentProps<'section'> {}

export default function CategoriesGridLoading({
  className,
  ...props
}: CategoriesGridLoadingProps) {
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
