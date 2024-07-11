import { type PropsWithChildren } from 'react';

export default async function NonAuthLayout({ children }: PropsWithChildren) {
  return await children;
}
