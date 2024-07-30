import axios from 'axios';
import { Info } from 'lucide-react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { Fine } from '@/common/types/api/fine.type';
import { PaginationSearchParams } from '@/common/types/pagination-search-params.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { SortingUtils } from '@/common/utils/sorting.util';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DataTable } from '@/components/ui/data-table';
import { TabsContent } from '@/components/ui/tabs';
import PaginationContainer from '@/containers/pagination.container';
import { userFinesTableColumns } from '@/lib/columns/user-fines-table.column';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'My fines',
};

interface FinesPageProps {
  searchParams: PaginationSearchParams;
}

export default async function FinesPage({ searchParams }: FinesPageProps) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const { data: fines, pagination } = await getFines(
    accessToken!,
    searchParams,
  );

  return (
    <TabsContent value="/me/fines">
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
      <PaginationContainer pagination={pagination} className="mb-6" />
      <DataTable
        columns={userFinesTableColumns}
        data={fines}
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

async function getFines(
  accessToken: string,
  searchParams?: PaginationSearchParams,
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
