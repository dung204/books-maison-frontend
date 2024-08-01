import axios from 'axios';
import { Info } from 'lucide-react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { Fine } from '@/common/types/api/fine.type';
import { CommonSearchParams } from '@/common/types/common-search-params.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DataTable } from '@/components/ui/data-table';
import { TabsContent } from '@/components/ui/tabs';
import { userFinesTableColumns } from '@/lib/columns/user-fines-table.column';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'My fines',
};

interface FinesPageProps {
  searchParams: CommonSearchParams;
}

export default async function FinesPage({ searchParams }: FinesPageProps) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const { data: fines, pagination } = await getFines(
    accessToken!,
    searchParams,
  );
  const { orderBy, order } = searchParams;

  return (
    <TabsContent value="/me/fines" className="outline-none">
      <Alert className="mb-6 bg-sky-100 text-sky-800">
        <Info className="h-4 w-4" color="rgb(7 89 133)" />
        <AlertDescription>
          The amount of one fine is{' '}
          <b>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(10000)}{' '}
            per overdue day
          </b>
        </AlertDescription>
      </Alert>
      <DataTable
        columns={userFinesTableColumns}
        data={fines}
        pagination={pagination}
        sorting={{ orderBy, order }}
      />
    </TabsContent>
  );
}

async function getFines(
  accessToken: string,
  searchParams?: CommonSearchParams,
) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/fines/me`);

  if (searchParams) {
    searchParams.page && url.searchParams.append('page', searchParams.page);
    searchParams.pageSize &&
      url.searchParams.append('pageSize', searchParams.pageSize);
    searchParams.orderBy &&
      url.searchParams.append('orderBy', searchParams.orderBy);
    searchParams.order && url.searchParams.append('order', searchParams.order);
  }

  const res = await axios.get<SuccessResponse<Fine[]>>(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return res.data;
}
