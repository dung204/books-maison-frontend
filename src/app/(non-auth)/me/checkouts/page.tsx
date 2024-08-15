import { Info } from 'lucide-react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { CommonSearchParams } from '@/common/types/common-search-params.type';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DataTable } from '@/components/ui/data-table';
import { TabsContent } from '@/components/ui/tabs';
import { userCheckoutTableColumns } from '@/lib/columns/user-checkout-table.column';
import { checkoutHttpClient } from '@/lib/http/checkout.http';

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
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const { data: checkouts, pagination } =
    await checkoutHttpClient.getCheckoutsOfCurrentUser(
      accessToken!,
      searchParams,
    );
  const { orderBy, order } = searchParams;

  return (
    <TabsContent value="/me/checkouts" className="outline-none">
      <Alert className="mb-6 bg-sky-100 text-sky-800">
        <Info className="h-4 w-4" color="rgb(7 89 133)" />
        <AlertDescription>
          Every time you borrow a book, a checkout is created. You can borrow a
          book for <b>14 days</b>
        </AlertDescription>
      </Alert>
      <DataTable
        columns={userCheckoutTableColumns}
        data={checkouts}
        pagination={pagination}
        sorting={{ orderBy, order }}
      />
    </TabsContent>
  );
}
