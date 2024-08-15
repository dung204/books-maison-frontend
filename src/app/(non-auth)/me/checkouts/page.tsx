import { randomUUID } from 'crypto';
import { Info } from 'lucide-react';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { CommonSearchParams } from '@/common/types/common-search-params.type';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DataTableLoading from '@/components/ui/data-table-loading';
import { TabsContent } from '@/components/ui/tabs';
import CheckoutFetchContainer from '@/containers/checkout-fetch.container';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'My checkouts',
};

interface CheckoutsPageProps {
  searchParams: CommonSearchParams;
}

export default async function CheckoutsPage({
  searchParams,
}: CheckoutsPageProps) {
  return (
    <TabsContent value="/me/checkouts" className="outline-none">
      <Alert className="mb-6 bg-sky-100 text-sky-800">
        <Info className="h-4 w-4" color="rgb(7 89 133)" />
        <AlertDescription>
          Every time you borrow a book, a checkout is created. You can borrow a
          book for <b>14 days</b>
        </AlertDescription>
      </Alert>
      <Suspense key={randomUUID()} fallback={<DataTableLoading rowCount={7} />}>
        <CheckoutFetchContainer searchParams={searchParams} />
      </Suspense>
    </TabsContent>
  );
}
