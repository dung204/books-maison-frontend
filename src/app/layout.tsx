import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Toaster } from 'sonner';

import favIcon from '@/assets/images/favicon.ico';
import { AuthProvider } from '@/common/providers';
import { MoveToTopButton } from '@/components/ui/buttons';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Books Maison',
    default: 'Books Maison',
  },
  description: 'Generated by create next app',
  icons: favIcon.src,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get('accessToken')?.value;
  const refreshToken = cookiesStore.get('refreshToken')?.value;

  return (
    <html lang="en">
      <head />
      <body>
        <AuthProvider initialTokens={{ accessToken, refreshToken }}>
          <main>{children}</main>
        </AuthProvider>
        <Toaster richColors closeButton position="top-right" duration={3000} />
        <MoveToTopButton />
        <SpeedInsights />
      </body>
    </html>
  );
}
