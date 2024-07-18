import Link from 'next/link';

import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AuthorDetailsLoading() {
  return (
    <Tabs className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-3">
        <Link href="#">
          <TabsTrigger value="overview" className="w-full">
            Overview
          </TabsTrigger>
        </Link>
        <Link href="#">
          <TabsTrigger value="bio" className="w-full">
            Biography
          </TabsTrigger>
        </Link>
        <Link href="#">
          <TabsTrigger value="books" className="w-full">
            Books
          </TabsTrigger>
        </Link>
      </TabsList>

      <div className="flex flex-col gap-3">
        <Skeleton className="h-[1lh] w-full" />
        <Skeleton className="h-[1lh] w-full" />
        <Skeleton className="h-[1lh] w-full" />
        <Skeleton className="h-[1lh] w-full" />
      </div>
    </Tabs>
  );
}
