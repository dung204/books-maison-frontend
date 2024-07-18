import { Search } from 'lucide-react';
import { type Metadata } from 'next';
import Image from 'next/image';

import homeBanner from '@/assets/images/library-banner-1.jpg';
import { Input } from '@/components/ui/input';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomePage() {
  return (
    <>
      <div className="relative flex h-screen w-full items-center justify-center">
        <div className="absolute left-0 top-0 z-20 h-full w-full bg-black/50"></div>
        <Image
          src={homeBanner}
          alt="Home banner"
          fill
          className="z-10 select-none object-cover"
        />
        <div className="z-40 mt-[74px] w-1/2 text-center">
          <h1 className="text-6xl font-extrabold text-white shadow drop-shadow-lg">
            Your home of knowledge
          </h1>
          <p className="mt-10 text-2xl text-white drop-shadow-sm">
            Explore the treasure of human knowledge with more than 123 books
            here
          </p>
          <div className="relative mx-auto w-3/4">
            <Input
              type="text"
              placeholder="Search by book titles, authors, categories, ..."
              className="mt-10 rounded-full ps-10"
              id="search-bar"
            />
            <label
              htmlFor="search-bar"
              className="absolute left-2 top-1/2 -translate-y-1/2"
            >
              <Search className="h-6 w-6" />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
