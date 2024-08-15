'use client';

import { ComponentProps, useId } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface DataTableLoadingProps extends ComponentProps<'div'> {
  rowCount: number;
}

export default function DataTableLoading({
  rowCount,
  className,
  ...props
}: DataTableLoadingProps) {
  const id = useId();

  return (
    <div className={cn('rounded-md border', className)} {...props}>
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: rowCount }).map((_, index) => (
              <TableHead
                key={`data-table-loading-${id}-header-${index}`}
                className="text-center"
              >
                <Skeleton className="h-8 w-full" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={`data-table-loading-${id}-${index}`}>
              {Array.from({ length: rowCount }).map((_, subIndex) => (
                <TableCell
                  key={`data-table-loading-${id}-${index}-${subIndex}`}
                >
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
