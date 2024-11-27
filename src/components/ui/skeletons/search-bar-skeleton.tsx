import type { ComponentProps } from 'react';

import { Skeleton } from '@/components/ui/skeletons';
import { cn } from '@/lib/cn';

interface SearchBarSkeletonProps extends ComponentProps<'div'> {}

export function SearchBarSkeleton({
  className,
  ...props
}: SearchBarSkeletonProps) {
  return (
    <div className={cn('grid grid-cols-6 gap-4', className)} {...props}>
      <Skeleton className="col-span-5 h-10 rounded-full border border-input px-3 py-2" />
      <Skeleton className="col-span-1 h-10" />
    </div>
  );
}
