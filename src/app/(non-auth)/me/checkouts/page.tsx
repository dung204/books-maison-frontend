import { randomUUID } from 'crypto';
import { Info } from 'lucide-react';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

import type { CheckoutSearchParams } from '@/common/types/api/checkout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DataTableSkeleton } from '@/components/ui/skeletons';
import { DataTable } from '@/components/ui/tables';
import { TabsContent } from '@/components/ui/tabs';
import { userCheckoutTableColumns } from '@/lib/columns';
import { checkoutHttpClient } from '@/lib/http';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'My checkouts',
};

interface CheckoutsPageProps {
  searchParams: Promise<CheckoutSearchParams>;
}

interface CheckoutFetchProps {
  searchParams: CheckoutSearchParams;
}

export default async function CheckoutsPage(props: CheckoutsPageProps) {
  const searchParams = await props.searchParams;

  return (
    <TabsContent value="/me/checkouts" className="outline-none">
      <Alert className="mb-6 bg-sky-100 text-sky-800">
        <Info className="h-4 w-4" color="rgb(7 89 133)" />
        <AlertDescription>
          Every time you borrow a book, a checkout is created. You can borrow a
          book for <b>14 days</b>
        </AlertDescription>
      </Alert>
      <Suspense
        key={randomUUID()}
        fallback={<DataTableSkeleton rowCount={7} />}
      >
        <CheckoutFetch searchParams={searchParams} />
      </Suspense>
    </TabsContent>
  );
}

async function CheckoutFetch({ searchParams }: CheckoutFetchProps) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const { data: checkouts, pagination } =
    await checkoutHttpClient.getCheckoutsOfCurrentUser(
      accessToken!,
      searchParams,
    );
  const { orderBy, order } = searchParams;

  return (
    <DataTable
      columns={userCheckoutTableColumns}
      data={checkouts}
      pagination={pagination}
      sorting={{ orderBy, order }}
    />
  );
}
