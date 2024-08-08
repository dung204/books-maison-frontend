import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuthorBooksLoading() {
  return (
    <section className="grid grid-cols-3 gap-8">
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
