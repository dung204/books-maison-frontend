'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Book } from '@/common/types/api/book/book.type';
import { CheckoutStatus } from '@/common/types/api/checkout/checkout-status.type';
import { Checkout } from '@/common/types/api/checkout/checkout.type';
import CheckoutStatusBadge from '@/components/ui/checkout-status-badge';
import { DataTableHeader } from '@/components/ui/data-table';

export const userCheckoutTableColumns: ColumnDef<Checkout>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableHeader column={column} headerName="Checkout ID" />
    ),
    cell: ({ row }) => {
      const id = row.getValue<string>('id');
      return <p className="text-center">{id}</p>;
    },
  },
  {
    accessorKey: 'book',
    header: ({ column }) => (
      <DataTableHeader column={column} headerName="Book" />
    ),
    cell: ({ row }) => {
      const book = row.getValue<Book>('book');
      return (
        <Link href={`/book/${book.id}`}>
          <p className="text-center hover:underline active:underline">
            {book.title}
          </p>
        </Link>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableHeader column={column} headerName="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue<CheckoutStatus>('status');
      return (
        <div className="flex justify-center">
          <CheckoutStatusBadge status={status} />
        </div>
      );
    },
  },
  {
    accessorKey: 'createdTimestamp',
    header: ({ column }) => (
      <DataTableHeader column={column} headerName="Created at" />
    ),
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
    accessorKey: 'dueTimestamp',
    header: ({ column }) => (
      <DataTableHeader column={column} headerName="Due at" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue<string>('dueTimestamp'));
      const formatted = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'long',
      }).format(date);
      return <p className="text-center">{formatted}</p>;
    },
  },
  {
    accessorKey: 'returnedTimestamp',
    header: ({ column }) => (
      <DataTableHeader column={column} headerName="Returned at" />
    ),
    cell: ({ row }) => {
      const dateStr = row.getValue<string | null>('returnedTimestamp');
      if (dateStr === null) return <p className="text-center">N/A</p>;

      const date = new Date(dateStr);

      const formatted = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'long',
      }).format(date);
      return <p className="text-center">{formatted}</p>;
    },
  },
  {
    accessorKey: 'note',
    enableSorting: false,
    header: 'Note',
    cell: ({ row }) => {
      const note = row.getValue<string | null>('note');
      return <p className="text-center">{note === null ? 'N/A' : note}</p>;
    },
  },
];
