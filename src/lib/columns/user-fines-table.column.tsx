'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkout } from '@/common/types/api/checkout';
import { Fine, FineStatus } from '@/common/types/api/fine';
import { FineStatusBadge } from '@/components/ui/badges';
import { DataTableHeader } from '@/components/ui/tables';
import { CheckoutDetailsContainer } from '@/containers/checkout';
import { PayFineContainer } from '@/containers/fine';

export const userFinesTableColumns: ColumnDef<Fine>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableHeader column={column} headerName="Fine ID" />
    ),
    cell: ({ row }) => {
      const id = row.getValue<string>('id');
      return <p className="text-center">{id}</p>;
    },
  },
  {
    accessorKey: 'checkout',
    header: ({ column }) => (
      <DataTableHeader column={column} headerName="Checkout ID" />
    ),
    cell: ({ row }) => {
      const checkout = row.getValue<Checkout>('checkout');
      return (
        <div className="flex justify-center">
          <CheckoutDetailsContainer checkout={checkout} />
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableHeader column={column} headerName="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue<FineStatus>('status');
      return (
        <div className="flex justify-center">
          <FineStatusBadge status={status} />
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
    accessorKey: 'payFineButton',
    enableSorting: false,
    enableMultiSort: false,
    enableHiding: false,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    header: '',
    cell: ({ row }) => <PayFineContainer fine={row.original} />,
  },
];
