import type { Metadata } from 'next';
import Image from 'next/image';

import homeBanner from '@/assets/images/library-banner-1.jpg';
import { GlobalSearchContainer } from '@/containers';
import { bookHttpClient } from '@/lib/http';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function HomePage() {
  const {
    pagination: { total },
  } = await bookHttpClient.getAllBooks();

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
        <div className="z-40 mt-[74px] flex w-1/2 flex-col items-center justify-center gap-10">
          <h1 className="text-6xl font-extrabold text-white shadow drop-shadow-lg">
            Your home of knowledge
          </h1>
          <p className="text-2xl text-white drop-shadow-sm">
            Explore the treasure of human knowledge with {total} books here
          </p>
          <div className="mx-auto w-3/4">
            <GlobalSearchContainer />
          </div>
        </div>
      </div>
    </>
  );
}
