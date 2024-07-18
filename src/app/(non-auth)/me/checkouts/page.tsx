import Link from 'next/link';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserCheckoutTableContainer from '@/containers/user-checkout-table.container';

export default function CheckoutsPage() {
  return (
    <Tabs className="w-full" defaultValue="checkouts">
      <TabsList className="mb-6 grid w-full grid-cols-4">
        <Link href={`/me/checkouts`}>
          <TabsTrigger value="checkouts" className="w-full">
            Checkouts
          </TabsTrigger>
        </Link>
        <Link href={`/me/favourite-books`}>
          <TabsTrigger value="favourite" className="w-full">
            Favourite books
          </TabsTrigger>
        </Link>
        <Link href={`/me/fines`}>
          <TabsTrigger value="fines" className="w-full">
            Fines
          </TabsTrigger>
        </Link>
        <Link href={`/me/transactions`}>
          <TabsTrigger value="transactions" className="w-full">
            Transactions
          </TabsTrigger>
        </Link>
      </TabsList>

      <UserCheckoutTableContainer />
    </Tabs>
  );
}
