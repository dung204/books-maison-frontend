import type { PropsWithChildren } from 'react';

import { Footer, Header } from '@/layouts';

export default async function NonAuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
