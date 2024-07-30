import axios from 'axios';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { Checkout } from '@/common/types/api/checkout.type';
import { PaginationSearchParams } from '@/common/types/pagination-search-params.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { SortingUtils } from '@/common/utils/sorting.util';
import { DataTable } from '@/components/ui/data-table';
import { TabsContent } from '@/components/ui/tabs';
import PaginationContainer from '@/containers/pagination.container';
import { userCheckoutTableColumns } from '@/lib/columns/user-checkout-table.column';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'My checkouts',
};

interface CheckoutsPageProps {
  searchParams: PaginationSearchParams;
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

  return (
    <TabsContent value="/me/checkouts">
      <PaginationContainer pagination={pagination} className="mb-6" />
      <DataTable
        columns={userCheckoutTableColumns}
        data={checkouts}
        pagination={{
          pageIndex: pagination.page - 1,
          pageSize: pagination.pageSize,
        }}
        sorting={[
          {
            id: searchParams.orderBy || SortingUtils.DEFAULT_ORDER_BY,
            desc: searchParams.order === 'desc',
          },
        ]}
      />
    </TabsContent>
  );
}

async function getCheckouts(
  accessToken: string,
  searchParams?: PaginationSearchParams,
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
