import Image from 'next/image';
import { type PropsWithChildren } from 'react';

import brandLogo from '@/assets/images/books-maison-logo-dark.svg';
import loginBannerImage from '@/assets/images/library-banner-3.jpg';

export default async function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-5 flex h-screen flex-col justify-center gap-10 overflow-y-auto px-32 py-10">
        <div className="mb-auto"></div>
        <Image
          src={brandLogo}
          alt="Brand logo"
          width="289"
          height="72"
          className="scale-90 self-center"
        />
        {children}
        <p className="mt-auto text-center text-sm text-muted-foreground">
          Your continued use of this website means you agree to our terms of use
        </p>
      </div>
      <div className="relative col-span-7 h-screen drop-shadow-2xl">
        <div className="absolute left-0 top-0 z-50 h-full w-full bg-black/40"></div>
        <Image
          src={loginBannerImage}
          alt="Login banner image"
          fill
          className="z-10 object-cover"
          sizes="(min-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
