import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { CommonSearchParams } from '@/common/types/common-search-params.type';
import { DataTable } from '@/components/ui/data-table';
import { TabsContent } from '@/components/ui/tabs';
import { userTransactionsTableColumns } from '@/lib/columns/user-transactions-table.column';
import { transactionHttpClient } from '@/lib/http/transaction.http';

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
  const { data: transactions, pagination } =
    await transactionHttpClient.getTransactionsOfCurrentUser(
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
