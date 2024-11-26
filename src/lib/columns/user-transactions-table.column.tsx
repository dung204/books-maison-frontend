'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Banknote } from 'lucide-react';

import { Transaction, TransactionMethod } from '@/common/types/api/transaction';
import { StringUtils } from '@/common/utils';
import { MomoIcon } from '@/components/ui/icons';
import { DataTableHeader } from '@/components/ui/tables';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const userTransactionsTableColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableHeader column={column} headerName="Transaction ID" />
    ),
    cell: ({ row }) => {
      const id = row.getValue<string>('id');
      return <p className="text-center">{id}</p>;
    },
  },
  {
    accessorKey: 'method',
    header: ({ column }) => (
      <DataTableHeader column={column} headerName="Method" />
    ),
    cell: ({ row }) => {
      const method = row.getValue<TransactionMethod>('method');
      return (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div className="flex justify-center">
                {(() => {
                  switch (method) {
                    case TransactionMethod.MOMO:
                      return <MomoIcon width={30} height={30} />;
                    case TransactionMethod.CASH:
                      return <Banknote className="h-10 w-10" />;
                    default:
                      return 'N/A';
                  }
                })()}
              </div>
            </TooltipTrigger>
            <TooltipContent sideOffset={5} side="top" align="center">
              {StringUtils.toProperCase(method)}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
];
