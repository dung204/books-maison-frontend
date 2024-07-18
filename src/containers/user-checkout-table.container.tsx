import axios from 'axios';
import { cookies } from 'next/headers';

import { Checkout } from '@/common/types/api/checkout.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { DataTable } from '@/components/ui/data-table';
import { userCheckoutTableColumns } from '@/lib/columns/user-checkout-table.column';

export default async function UserCheckoutTableContainer() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const { data: checkouts, pagination } = await getCheckouts(accessToken!);

  return <DataTable columns={userCheckoutTableColumns} data={checkouts} />;
}

async function getCheckouts(accessToken: string) {
  const res = await axios.get<SuccessResponse<Checkout[]>>(
    `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/checkouts/me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return res.data;
}
