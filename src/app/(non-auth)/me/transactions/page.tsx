import { randomUUID } from 'crypto';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

import { CommonSearchParams } from '@/common/types';
import { DataTableSkeleton } from '@/components/ui/skeletons';
import { DataTable } from '@/components/ui/tables';
import { TabsContent } from '@/components/ui/tabs';
import { userTransactionsTableColumns } from '@/lib/columns';
import { transactionHttpClient } from '@/lib/http';

interface TransactionsPageProps {
  searchParams: Promise<CommonSearchParams>;
}

interface TransactionFetchProps {
  searchParams: CommonSearchParams;
}

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'My transactions',
};

export default async function TransactionsPage(props: TransactionsPageProps) {
  const searchParams = await props.searchParams;

  return (
    <TabsContent value="/me/transactions" className="outline-none">
      <Suspense
        key={randomUUID()}
        fallback={<DataTableSkeleton rowCount={4} />}
      >
        <TransactionFetch searchParams={searchParams} />
      </Suspense>
    </TabsContent>
  );
}

async function TransactionFetch({ searchParams }: TransactionFetchProps) {
  const cookieStore = await cookies();
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
