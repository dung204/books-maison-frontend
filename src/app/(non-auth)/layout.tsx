import { cookies } from 'next/headers';
import type { PropsWithChildren } from 'react';

import { AuthProvider } from '@/common/providers';
import { Footer, Header } from '@/layouts';

export default async function NonAuthLayout({ children }: PropsWithChildren) {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get('accessToken')?.value;
  const refreshToken = cookiesStore.get('refreshToken')?.value;

  return (
    <AuthProvider initialTokens={{ accessToken, refreshToken }}>
      <Header />
      <main>{children}</main>
      <Footer />
    </AuthProvider>
  );
}
