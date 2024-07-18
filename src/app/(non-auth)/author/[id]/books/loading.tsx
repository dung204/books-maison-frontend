import { Search } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AuthorBooksLoading() {
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

      <div>
        <section className="flex justify-between">
          <div className="w-1/2">
            <div className="grid grid-cols-6 gap-4">
              <div className="relative col-span-5">
                <Input
                  type="text"
                  placeholder="Enter a book title to search..."
                  className="rounded-full ps-10"
                  id="search-bar"
                  name="title"
                />
                <label
                  htmlFor="search-bar"
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                >
                  <Search className="h-6 w-6" />
                </label>
              </div>
              <Button type="button" className="col-span-1">
                Search
              </Button>
            </div>
          </div>
        </section>
        <section className="mt-10 grid grid-cols-3 gap-8">
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
      </div>
    </Tabs>
  );
}
