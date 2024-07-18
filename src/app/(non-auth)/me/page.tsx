import Link from 'next/link';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProfilePage() {
  return (
    <Tabs className="w-full" defaultValue="checkouts">
      <TabsList className="mb-6 grid w-full grid-cols-4">
        <Link href={`/me`}>
          <TabsTrigger value="checkouts" className="w-full">
            Checkouts
          </TabsTrigger>
        </Link>
        <Link href={`/me`}>
          <TabsTrigger value="favourite" className="w-full">
            Favourite books
          </TabsTrigger>
        </Link>
        <Link href={`/me`}>
          <TabsTrigger value="fines" className="w-full">
            Fines
          </TabsTrigger>
        </Link>
        <Link href={`/me`}>
          <TabsTrigger value="transactions" className="w-full">
            Transactions
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}
