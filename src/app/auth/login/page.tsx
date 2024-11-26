import { type Metadata } from 'next';
import Link from 'next/link';

import { LoginContainer } from '@/containers/auth';

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
