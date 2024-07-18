'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

import { Book } from '@/common/types/api/book.type';
import { CheckoutStatus } from '@/common/types/api/checkout-status.type';
import { Checkout } from '@/common/types/api/checkout.type';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const userCheckoutTableColumns: ColumnDef<Checkout>[] = [
  {
    accessorKey: 'book',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Book name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const book = row.getValue<Book>('book');
      return (
        <Link href={`/book/${book.id}`}>
          <span>{book.title}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue<CheckoutStatus>('status');
      return (
        <Badge
          variant={
            status === CheckoutStatus.OVERDUE ? 'destructive' : 'default'
          }
          className={cn(
            {
              'bg-green-500 hover:bg-green-500/80':
                status === CheckoutStatus.RETURNED,
            },
            {
              'bg-yellow-500 hover:bg-yellow-500/80':
                status === CheckoutStatus.RENTING,
            },
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'createdTimestamp',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue<string>('createdTimestamp'));
      const formatted = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'long',
      }).format(date);
      return formatted;
    },
  },
  {
    accessorKey: 'dueTimestamp',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Due at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue<string>('dueTimestamp'));
      const formatted = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'long',
      }).format(date);
      return formatted;
    },
  },
  {
    accessorKey: 'returnedTimestamp',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Returned at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateStr = row.getValue<string | null>('returnedTimestamp');
      if (dateStr === null) return 'N/A';

      const date = new Date(dateStr);

      const formatted = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'long',
      }).format(date);
      return formatted;
    },
  },
  {
    accessorKey: 'note',
    header: 'Note',
    cell: ({ row }) => {
      const note = row.getValue<string | null>('note');
      return note === null ? 'N/A' : note;
    },
  },
];
