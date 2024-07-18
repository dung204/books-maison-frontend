import { type PropsWithChildren } from 'react';

import Footer from '@/layouts/footer';
import Header from '@/layouts/header';

export default async function NonAuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
