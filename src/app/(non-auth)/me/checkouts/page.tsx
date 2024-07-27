import axios from 'axios';
import { cookies } from 'next/headers';
import Link from 'next/link';

import { Checkout } from '@/common/types/api/checkout.type';
import { PaginationSearchParams } from '@/common/types/pagination-search-params.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { DataTable } from '@/components/ui/data-table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PaginationContainer from '@/containers/pagination.container';
import UserCheckoutTableContainer from '@/containers/user-checkout-table.container';
import { userCheckoutTableColumns } from '@/lib/columns/user-checkout-table.column';

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

      <PaginationContainer pagination={pagination} className="mb-6" />
      <DataTable
        columns={userCheckoutTableColumns}
        data={checkouts}
        pagination={pagination}
      />
    </Tabs>
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
