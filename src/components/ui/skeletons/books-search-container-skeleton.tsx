import { Filter } from 'lucide-react';

import { Button } from '@/components/ui/buttons';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/cards';
import {
  PaginationContainerSkeleton,
  SearchBarSkeleton,
  Skeleton,
} from '@/components/ui/skeletons';

export function BooksSearchContainerSkeleton() {
  return (
    <>
      <section className="flex justify-between">
        <div className="w-1/2">
          <SearchBarSkeleton />
        </div>
        <div>
          <Button disabled className="relative bg-transparent text-transparent">
            <Skeleton className="absolute inset-0 h-full w-full" />
            <Filter className="me-2 h-4 w-4" /> Advanced Filter
          </Button>
        </div>
      </section>
      <PaginationContainerSkeleton className="mt-6" />
      <section className="mt-10 grid grid-cols-3 gap-8">
        {Array.from({ length: 9 }).map((_, index) => (
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
    </>
  );
}
