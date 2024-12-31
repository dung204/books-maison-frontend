import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  PaginationContainerSkeleton,
  SearchBarSkeleton,
  Skeleton,
} from '@/components/ui/skeletons';

export function AuthorsSearchContainerSkeleton() {
  return (
    <>
      <section className="flex justify-between">
        <div className="w-full md:w-2/3 xl:w-1/2">
          <SearchBarSkeleton />
        </div>
      </section>
      <PaginationContainerSkeleton className="mt-6" />
      <section className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
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
    </>
  );
}
