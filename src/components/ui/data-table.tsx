'use client';

import {
  Column,
  ColumnDef,
  SortDirection,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';

import { Pagination } from '@/common/types/pagination.type';
import { SortingSearchParams } from '@/common/types/sorting-search-params.type';
import { SortingUtils } from '@/common/utils/sorting.util';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PaginationContainer from '@/containers/pagination.container';
import { cn } from '@/lib/utils';

interface DataTableProps<TData, TValue> extends ComponentProps<'div'> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: Pagination;
  sorting: SortingSearchParams;
}

interface DataTableHeaderProps extends ComponentProps<'div'> {
  column: Column<any>;
  headerName?: string;
}

interface SortingIconProps extends ComponentProps<typeof ArrowUp> {
  isSorted: false | SortDirection;
}

function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  sorting,
  className,
  ...props
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    pageCount: pagination.pageSize,
    state: {
      pagination: {
        pageIndex: pagination.page - 1,
        pageSize: pagination.pageSize,
      },
      sorting: [
        {
          id: sorting.orderBy || SortingUtils.DEFAULT_ORDER_BY,
          desc: sorting.order === 'desc',
        },
      ],
    },
  });

  return (
    <>
      <PaginationContainer pagination={pagination} className="mb-6" />
      <div className={cn('rounded-md border', className)} {...props}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function DataTableHeader({
  column,
  headerName,
  className,
  ...props
}: DataTableHeaderProps) {
  const router = useRouter();

  const handleSort = () => {
    const order =
      !column.getIsSorted() || column.getIsSorted() === 'desc' ? 'asc' : 'desc';
    const url = new URL(location.href);
    url.searchParams.set('orderBy', column.id);
    url.searchParams.set('order', order);
    router.push(url.toString());
  };

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button variant="ghost" onClick={handleSort}>
        {headerName ?? column.id}
        <SortingIcon isSorted={column.getIsSorted()} className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

function SortingIcon({ isSorted, ...props }: SortingIconProps) {
  if (!isSorted) {
    return null;
  }

  return isSorted === 'asc' ? <ArrowUp {...props} /> : <ArrowDown {...props} />;
}

export { DataTable, DataTableHeader };
