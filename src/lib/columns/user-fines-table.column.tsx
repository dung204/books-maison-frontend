'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkout } from '@/common/types/api/checkout.type';
import { Fine } from '@/common/types/api/fine.type';
import { Badge } from '@/components/ui/badge';
import { DataTableHeader } from '@/components/ui/data-table';
import PayFineContainer from '@/containers/pay-fine.container';
import { cn } from '@/lib/utils';

export const userFinesTableColumns: ColumnDef<Fine>[] = [
  {
    accessorKey: 'checkout',
    header: ({ column }) => (
      <DataTableHeader column={column} headerName="Checkout ID" />
    ),
    cell: ({ row }) => {
      const checkout = row.getValue<Checkout>('checkout');
      return <p className="text-center">{checkout.id}</p>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableHeader column={column} headerName="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue<'ISSUED' | 'CANCELLED' | 'PAID'>('status');
      return (
        <div className="flex justify-center">
          <Badge
            variant={status === 'CANCELLED' ? 'destructive' : 'default'}
            className={cn(
              {
                'bg-green-500 hover:bg-green-500/80': status === 'PAID',
              },
              {
                'bg-yellow-500 hover:bg-yellow-500/80': status === 'ISSUED',
              },
            )}
          >
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableHeader column={column} headerName="Amount" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>('amount');
      const formatted = Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(amount);
      return <p className="text-center">{formatted}</p>;
    },
  },
  {
    accessorKey: 'createdTimestamp',
    header: ({ column }) => {
      return <DataTableHeader column={column} headerName="Created at" />;
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue<string>('createdTimestamp'));
      const formatted = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'long',
      }).format(date);
      return <p className="text-center">{formatted}</p>;
    },
  },
  {
    accessorKey: 'id',
    enableSorting: false,
    enableMultiSort: false,
    enableHiding: false,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    header: '',
    cell: ({ row }) => <PayFineContainer fine={row.original} />,
  },
];
