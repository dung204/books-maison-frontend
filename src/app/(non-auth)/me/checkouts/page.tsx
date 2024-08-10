import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { CommonSearchParams } from '@/common/types/common-search-params.type';
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
      <DataTable
        columns={userCheckoutTableColumns}
        data={checkouts}
        pagination={pagination}
        sorting={{ orderBy, order }}
      />
    </TabsContent>
  );
}
