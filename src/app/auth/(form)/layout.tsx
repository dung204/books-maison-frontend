import Image from 'next/image';
import { type PropsWithChildren } from 'react';

import loginBannerImage from '@/assets/images/library-banner-3.jpg';
import { BrandIcon } from '@/components/ui/icons';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="absolute left-0 top-0 z-20 h-full w-full bg-black/40"></div>
      <picture>
        <source srcSet="about:blank" media="(max-width: 768px)" />
        <Image
          src={loginBannerImage}
          alt="Login banner image"
          fill
          className="z-10 object-cover max-md:hidden"
        />
      </picture>
      <div className="relative z-50 flex h-dvh w-full items-center justify-center">
        <section className="flex w-[500px] flex-col gap-6 overflow-auto bg-white px-4 py-10 shadow-lg max-md:h-dvh max-md:w-full md:max-h-[calc(100dvh-32px)] md:rounded-lg md:px-10">
          <BrandIcon height="58" className="self-center" priority />
          {children}
          <p className="mt-auto text-center text-sm text-muted-foreground">
            Your continued use of this website means you agree to our terms of
            use
          </p>
        </section>
      </div>
    </>
  );
}
