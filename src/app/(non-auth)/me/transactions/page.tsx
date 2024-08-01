import axios from 'axios';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { Transaction } from '@/common/types/api/transaction.type';
import { CommonSearchParams } from '@/common/types/common-search-params.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { DataTable } from '@/components/ui/data-table';
import { TabsContent } from '@/components/ui/tabs';
import { userTransactionsTableColumns } from '@/lib/columns/user-transactions-table.column';

interface TransactionsPageProps {
  searchParams: CommonSearchParams;
}

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'My transactions',
};

export default async function TransactionsPage({
  searchParams,
}: TransactionsPageProps) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const { data: transactions, pagination } = await getTransactions(
    accessToken!,
    searchParams,
  );
  const { orderBy, order } = searchParams;

  return (
    <TabsContent value="/me/transactions" className="outline-none">
      <DataTable
        columns={userTransactionsTableColumns}
        data={transactions}
        pagination={pagination}
        sorting={{ orderBy, order }}
      />
    </TabsContent>
  );
}

async function getTransactions(
  accessToken: string,
  searchParams?: CommonSearchParams,
) {
  const url = new URL(
    `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/transactions/me`,
  );

  if (searchParams) {
    searchParams.page && url.searchParams.append('page', searchParams.page);
    searchParams.pageSize &&
      url.searchParams.append('pageSize', searchParams.pageSize);
    searchParams.orderBy &&
      url.searchParams.append('orderBy', searchParams.orderBy);
  }

  const res = await axios.get<SuccessResponse<Transaction[]>>(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
}
