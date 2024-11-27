import type { ComponentProps } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeletons';
import { cn } from '@/lib/cn';

interface PaginationContainerSkeletonProps extends ComponentProps<'section'> {}

export function PaginationContainerSkeleton({
  className,
  ...props
}: PaginationContainerSkeletonProps) {
  return (
    <section
      className={cn('flex w-full items-center justify-between', className)}
      {...props}
    >
      <div className="flex items-center justify-stretch gap-4">
        <div>Show</div>
        <Skeleton className="h-10 w-32" />
        <div>items</div>
      </div>
      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious className="pointer-events-none opacity-60" />
          </PaginationItem>
          <PaginationItem>
            <Skeleton className="h-10 w-10" />
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis className="opacity-60" />
          </PaginationItem>
          <PaginationItem>
            <Skeleton className="h-10 w-10" />
          </PaginationItem>
          <PaginationItem>
            <Skeleton className="h-10 w-10" />
          </PaginationItem>
          <PaginationItem>
            <Skeleton className="h-10 w-10" />
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis className="opacity-60" />
          </PaginationItem>
          <PaginationItem>
            <Skeleton className="h-10 w-10" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext className="pointer-events-none opacity-60" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
