import type { ComponentProps } from 'react';

import { Skeleton } from '@/components/ui/skeletons';
import { cn } from '@/lib/cn';

interface SearchBarSkeletonProps extends ComponentProps<'div'> {}

export function SearchBarSkeleton({
  className,
  ...props
}: SearchBarSkeletonProps) {
  return (
    <div className={cn('grid grid-cols-12 gap-4', className)} {...props}>
      <Skeleton className="col-span-8 h-10 rounded-full border border-input px-3 py-2 xs:col-span-9 sm:col-span-10" />
      <Skeleton className="col-span-4 h-10 xs:col-span-3 sm:col-span-2" />
    </div>
  );
}
