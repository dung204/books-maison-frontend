import { cookies } from 'next/headers';

import { CommonSearchParams } from '@/common/types/common-search-params.type';
import { DataTable } from '@/components/ui/data-table';
import { userFinesTableColumns } from '@/lib/columns/user-fines-table.column';
import { fineHttpClient } from '@/lib/http/fine.http';

interface FineFetchContainerProps {
  searchParams: CommonSearchParams;
}

export default async function FineFetchContainer({
  searchParams,
}: FineFetchContainerProps) {
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
