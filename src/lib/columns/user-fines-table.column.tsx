'use client';

import { ColumnDef } from '@tanstack/react-table';
import axios, { AxiosError } from 'axios';
import { Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import useAuth from '@/common/hooks/use-auth.hook';
import { Checkout } from '@/common/types/api/checkout.type';
import { Fine } from '@/common/types/api/fine.type';
import { TransactionMethod } from '@/common/types/api/transaction-method.type';
import { Transaction } from '@/common/types/api/transaction.type';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTableHeader } from '@/components/ui/data-table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import MomoIcon from '@/components/ui/momo-icon/momo-icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
