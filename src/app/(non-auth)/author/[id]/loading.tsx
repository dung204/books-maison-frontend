import { Skeleton } from '@/components/ui/skeleton';

export default function AuthorDetailsLoading() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-[1lh] w-full" />
      <Skeleton className="h-[1lh] w-full" />
      <Skeleton className="h-[1lh] w-full" />
      <Skeleton className="h-[1lh] w-full" />
    </div>
  );
}
