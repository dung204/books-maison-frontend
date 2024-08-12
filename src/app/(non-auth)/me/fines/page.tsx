import { Info } from 'lucide-react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { CommonSearchParams } from '@/common/types/common-search-params.type';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DataTable } from '@/components/ui/data-table';
import { TabsContent } from '@/components/ui/tabs';
import { userFinesTableColumns } from '@/lib/columns/user-fines-table.column';
import { fineHttpClient } from '@/lib/http/fine.http';

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

  const { data: fines, pagination } =
    await fineHttpClient.getAllFinesOfCurrentUser(accessToken!, searchParams);
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
