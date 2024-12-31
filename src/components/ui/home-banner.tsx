import Image from 'next/image';
import type { ComponentProps } from 'react';

import bannerImg from '@/assets/images/library-banner-1.jpg';
import { cn } from '@/lib/cn';

interface HomeBannerProps extends ComponentProps<'section'> {
  bannerTitle?: string;
}

export default function HomeBanner({
  bannerTitle,
  className,
  ...props
}: HomeBannerProps) {
  return (
    <section
      className={cn(
        'relative flex h-[300px] w-full items-center justify-center xs:h-[350px] md:h-[400px]',
        className,
      )}
      {...props}
    >
      <div className="absolute left-0 top-0 z-20 h-full w-full bg-black/50"></div>
      <Image
        src={bannerImg}
        alt="banner"
        fill
        className="z-10 select-none object-cover"
      />
      <div className="z-40 mt-[64px] text-center text-white lg:mt-[74px]">
        <h1 className="text-3xl font-extrabold xs:text-4xl md:text-5xl">
          {bannerTitle}
        </h1>
      </div>
    </section>
  );
}
