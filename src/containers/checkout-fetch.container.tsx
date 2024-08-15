import { cookies } from 'next/headers';

import { CheckoutSearchParams } from '@/common/types/api/checkout/checkout-search-params.type';
import { DataTable } from '@/components/ui/data-table';
import { userCheckoutTableColumns } from '@/lib/columns/user-checkout-table.column';
import { checkoutHttpClient } from '@/lib/http/checkout.http';

export interface CheckoutFetchContainerProps {
  searchParams: CheckoutSearchParams;
}

export default async function CheckoutFetchContainer({
  searchParams,
}: CheckoutFetchContainerProps) {
  const cookieStore = cookies();
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
