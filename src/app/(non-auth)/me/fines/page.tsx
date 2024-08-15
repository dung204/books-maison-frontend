import { randomUUID } from 'crypto';
import { Info } from 'lucide-react';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { CommonSearchParams } from '@/common/types/common-search-params.type';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DataTableLoading from '@/components/ui/data-table-loading';
import { TabsContent } from '@/components/ui/tabs';
import FineFetchContainer from '@/containers/fine-fetch.container';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'My fines',
};

interface FinesPageProps {
  searchParams: CommonSearchParams;
}

export default async function FinesPage({ searchParams }: FinesPageProps) {
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
      <Suspense key={randomUUID()} fallback={<DataTableLoading rowCount={6} />}>
        <FineFetchContainer searchParams={searchParams} />
      </Suspense>
    </TabsContent>
  );
}
