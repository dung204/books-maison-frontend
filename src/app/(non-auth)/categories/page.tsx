import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import banner from '@/assets/images/library-banner-1.jpg';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const metadata: Metadata = {
  title: 'Categories',
};

export default function CategoriesPage() {
  return (
    <div className="container mt-[74px] py-10">
      <h1 className="text-4xl font-semibold">Categories</h1>
      <section className="mt-10">
        <Pagination className="items-center justify-between">
          <div className="flex items-center justify-stretch gap-4">
            <div>Show</div>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div>categories</div>
          </div>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
      <section className="mt-10 grid grid-cols-3 gap-8">
        <Link href="#" className="group">
          <Card className="relative h-44 w-full overflow-hidden">
            <div className="absolute left-0 top-0 z-20 h-full w-full bg-black/50"></div>
            <Image
              src={banner}
              alt="banner"
              fill
              className="z-10 object-cover transition-all duration-300 group-hover:scale-110"
            />
            <CardHeader className="absolute top-1/2 z-30 w-full -translate-y-1/2 text-white">
              <CardTitle className="text-center">Action/Adventure</CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link href="#" className="group">
          <Card className="relative h-44 w-full overflow-hidden">
            <div className="absolute left-0 top-0 z-20 h-full w-full bg-black/50"></div>
            <Image
              src={banner}
              alt="banner"
              fill
              className="z-10 object-cover transition-all duration-300 group-hover:scale-110"
            />
            <CardHeader className="absolute top-1/2 z-30 w-full -translate-y-1/2 text-white">
              <CardTitle className="text-center">Action/Adventure</CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link href="#" className="group">
          <Card className="relative h-44 w-full overflow-hidden">
            <div className="absolute left-0 top-0 z-20 h-full w-full bg-black/50"></div>
            <Image
              src={banner}
              alt="banner"
              fill
              className="z-10 object-cover transition-all duration-300 group-hover:scale-110"
            />
            <CardHeader className="absolute top-1/2 z-30 w-full -translate-y-1/2 text-white">
              <CardTitle className="text-center">Action/Adventure</CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link href="#" className="group">
          <Card className="relative h-44 w-full overflow-hidden">
            <div className="absolute left-0 top-0 z-20 h-full w-full bg-black/50"></div>
            <Image
              src={banner}
              alt="banner"
              fill
              className="z-10 object-cover transition-all duration-300 group-hover:scale-110"
            />
            <CardHeader className="absolute top-1/2 z-30 w-full -translate-y-1/2 text-white">
              <CardTitle className="text-center">Action/Adventure</CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link href="#" className="group">
          <Card className="relative h-44 w-full overflow-hidden">
            <div className="absolute left-0 top-0 z-20 h-full w-full bg-black/50"></div>
            <Image
              src={banner}
              alt="banner"
              fill
              className="z-10 object-cover transition-all duration-300 group-hover:scale-110"
            />
            <CardHeader className="absolute top-1/2 z-30 w-full -translate-y-1/2 text-white">
              <CardTitle className="text-center">Action/Adventure</CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link href="#" className="group">
          <Card className="relative h-44 w-full overflow-hidden">
            <div className="absolute left-0 top-0 z-20 h-full w-full bg-black/50"></div>
            <Image
              src={banner}
              alt="banner"
              fill
              className="z-10 object-cover transition-all duration-300 group-hover:scale-110"
            />
            <CardHeader className="absolute top-1/2 z-30 w-full -translate-y-1/2 text-white">
              <CardTitle className="text-center">Action/Adventure</CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link href="#" className="group">
          <Card className="relative h-44 w-full overflow-hidden">
            <div className="absolute left-0 top-0 z-20 h-full w-full bg-black/50"></div>
            <Image
              src={banner}
              alt="banner"
              fill
              className="z-10 object-cover transition-all duration-300 group-hover:scale-110"
            />
            <CardHeader className="absolute top-1/2 z-30 w-full -translate-y-1/2 text-white">
              <CardTitle className="text-center">Action/Adventure</CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link href="#" className="group">
          <Card className="relative h-44 w-full overflow-hidden">
            <div className="absolute left-0 top-0 z-20 h-full w-full bg-black/50"></div>
            <Image
              src={banner}
              alt="banner"
              fill
              className="z-10 object-cover transition-all duration-300 group-hover:scale-110"
            />
            <CardHeader className="absolute top-1/2 z-30 w-full -translate-y-1/2 text-white">
              <CardTitle className="text-center">Action/Adventure</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      </section>
    </div>
  );
}
