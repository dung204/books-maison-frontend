import { type Metadata } from 'next';
import Link from 'next/link';

import RegisterContainer from '@/containers/register.container';

export const metadata: Metadata = {
  title: 'Register',
};

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-center text-3xl">Create an account</h1>
      <RegisterContainer />
      <p className="text-center">
        Already had an account? <Link href="/auth/login">Login</Link>
      </p>
    </>
  );
}
