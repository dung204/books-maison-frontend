import { randomUUID } from 'crypto';
import { Info } from 'lucide-react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

import { CommonSearchParams } from '@/common/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DataTableSkeleton } from '@/components/ui/skeletons';
import { DataTable } from '@/components/ui/tables';
import { TabsContent } from '@/components/ui/tabs';
import { userFinesTableColumns } from '@/lib/columns';
import { fineHttpClient } from '@/lib/http';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'My fines',
};

interface FineFetchProps {
  searchParams: CommonSearchParams;
}

interface FinesPageProps {
  searchParams: Promise<CommonSearchParams>;
}

export default async function FinesPage(props: FinesPageProps) {
  const searchParams = await props.searchParams;

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
      <Suspense
        key={randomUUID()}
        fallback={<DataTableSkeleton rowCount={6} />}
      >
        <FineFetch searchParams={searchParams} />
      </Suspense>
    </TabsContent>
  );
}

async function FineFetch({ searchParams }: FineFetchProps) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const { data: fines, pagination } =
    await fineHttpClient.getAllFinesOfCurrentUser(accessToken!, searchParams);
  const { orderBy, order } = searchParams;

  return (
    <DataTable
      columns={userFinesTableColumns}
      data={fines}
      pagination={pagination}
      sorting={{ orderBy, order }}
    />
  );
}
