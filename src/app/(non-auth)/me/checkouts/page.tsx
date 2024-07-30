import axios from 'axios';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { Checkout } from '@/common/types/api/checkout.type';
import { CommonSearchParams } from '@/common/types/common-search-params.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { DataTable } from '@/components/ui/data-table';
import { TabsContent } from '@/components/ui/tabs';
import { userCheckoutTableColumns } from '@/lib/columns/user-checkout-table.column';

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
  const { data: checkouts, pagination } = await getCheckouts(
    accessToken!,
    searchParams,
  );
  const { orderBy, order } = searchParams;

  return (
    <TabsContent value="/me/checkouts">
      <DataTable
        columns={userCheckoutTableColumns}
        data={checkouts}
        pagination={pagination}
        sorting={{ orderBy, order }}
      />
    </TabsContent>
  );
}

async function getCheckouts(
  accessToken: string,
  searchParams?: CommonSearchParams,
) {
  const url = new URL(
    `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/checkouts/me`,
  );

  if (searchParams) {
    searchParams.page && url.searchParams.append('page', searchParams.page);
    searchParams.pageSize &&
      url.searchParams.append('pageSize', searchParams.pageSize);
    searchParams.orderBy &&
      url.searchParams.append('orderBy', searchParams.orderBy);
    searchParams.order && url.searchParams.append('order', searchParams.order);
  }

  const res = await axios.get<SuccessResponse<Checkout[]>>(url.href, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
}
