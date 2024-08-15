import { cookies } from 'next/headers';

import { CommonSearchParams } from '@/common/types/common-search-params.type';
import { DataTable } from '@/components/ui/data-table';
import { userTransactionsTableColumns } from '@/lib/columns/user-transactions-table.column';
import { transactionHttpClient } from '@/lib/http/transaction.http';

interface TransactionFetchContainerProps {
  searchParams: CommonSearchParams;
}

export default async function TransactionFetchContainer({
  searchParams,
}: TransactionFetchContainerProps) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const { data: transactions, pagination } =
    await transactionHttpClient.getTransactionsOfCurrentUser(
      accessToken!,
      searchParams,
    );
  const { orderBy, order } = searchParams;

  return (
    <DataTable
      columns={userTransactionsTableColumns}
      data={transactions}
      pagination={pagination}
      sorting={{ orderBy, order }}
    />
  );
}
