import type { Metadata } from 'next';
import Image from 'next/image';
import type { PropsWithChildren } from 'react';

import brandLogo from '@/assets/images/books-maison-logo-dark.svg';
import LoadingIndicator from '@/components/ui/loading-indicator';

export const metadata: Metadata = {
  title: 'Logging in...',
};

export default function CallbackLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="flex h-dvh flex-col items-center justify-between py-10">
        <Image src={brandLogo} alt="Brand logo" />
        <div className="flex flex-col items-center justify-center gap-4">
          {children}
        </div>
        <div></div>
      </main>
    </>
  );
}
