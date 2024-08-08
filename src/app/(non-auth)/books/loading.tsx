import { Filter, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HomeBanner from '@/components/ui/home-banner';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

export default function SearchLoading() {
  return (
    <>
      <HomeBanner
        className="h-[400px]"
        bannerTitle="Search for a decent book here at Books Maison"
      />
      <div className="container py-10">
        <section className="flex justify-between">
          <div className="w-1/2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter a book title to search..."
                className="rounded-full ps-10"
                id="search-bar"
              />
              <label
                htmlFor="search-bar"
                className="absolute left-2 top-1/2 -translate-y-1/2"
              >
                <Search className="h-6 w-6" />
              </label>
            </div>
            <p className="mt-3">
              Showing results for:{' '}
              <span className="font-bold">&quot;&quot;</span>
            </p>
          </div>
          <Button className="">
            <Filter className="me-2 h-4 w-4" /> Advanced Filter
          </Button>
        </section>
        <section className="mt-10 grid grid-cols-4 gap-8">
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
    </>
  );
}
