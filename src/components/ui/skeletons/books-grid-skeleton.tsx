import { ComponentProps } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/cards';
import { Skeleton } from '@/components/ui/skeletons';
import { cn } from '@/lib/cn';

interface BooksGridSkeletonProps extends ComponentProps<'section'> {}

export function BooksGridSkeleton({
  className,
  ...props
}: BooksGridSkeletonProps) {
  return (
    <section className={cn('grid grid-cols-3 gap-8', className)} {...props}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="relative h-[300px] overflow-hidden">
            <Skeleton className="absolute left-0 top-0 h-full w-full" />
          </div>
          <CardHeader>
            <CardTitle className="line-clamp-1 h-[1.2lh]">
              <Skeleton className="h-full w-full" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex h-[9lh] flex-col gap-2">
            <div className="line-clamp-2">
              <Skeleton className="h-[1lh] w-full" />
            </div>
            <div className="line-clamp-2">
              <Skeleton className="h-[1lh] w-full" />
            </div>
            <div className="line-clamp-3">
              <Skeleton className="h-[3lh] w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
