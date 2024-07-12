import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import brandLogo from '@/assets/images/books-maison-logo-dark.svg';
import loginBannerImage from '@/assets/images/library-banner-3.jpg';
import LoginContainer from '@/containers/login.container';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <>
      <h1 className="text-center text-3xl">Login to Books Maison</h1>
      <LoginContainer />
      <p className="text-center">
        Don&apos;t have an account?{' '}
        <Link href="/auth/register">Create an account</Link>
      </p>
    </>
  );
}
