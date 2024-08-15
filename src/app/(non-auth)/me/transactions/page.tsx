import { randomUUID } from 'crypto';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { CommonSearchParams } from '@/common/types/common-search-params.type';
import DataTableLoading from '@/components/ui/data-table-loading';
import { TabsContent } from '@/components/ui/tabs';
import TransactionFetchContainer from '@/containers/transaction-fetch.container';

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
  return (
    <TabsContent value="/me/transactions" className="outline-none">
      <Suspense key={randomUUID()} fallback={<DataTableLoading rowCount={4} />}>
        <TransactionFetchContainer searchParams={searchParams} />
      </Suspense>
    </TabsContent>
  );
}
