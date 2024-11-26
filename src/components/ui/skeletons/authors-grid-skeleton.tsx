import type { ComponentProps } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeletons';
import { cn } from '@/lib/cn';

interface AuthorsGridSkeletonProps extends ComponentProps<'section'> {}

export function AuthorsGridSkeleton({
  className,
  ...props
}: AuthorsGridSkeletonProps) {
  return (
    <section className={cn('grid grid-cols-4 gap-8', className)} {...props}>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center justify-center">
          <Avatar className="h-40 w-40">
            <AvatarFallback>
              <Skeleton className="h-full w-full" />
            </AvatarFallback>
          </Avatar>
          <div className="mt-6 h-[1.2lh] w-2/3">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      ))}
    </section>
  );
}
