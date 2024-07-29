import Link from 'next/link';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CheckoutsLoading() {
  return (
    <Tabs className="w-full" defaultValue="checkouts">
      <TabsList className="mb-6 grid w-full grid-cols-4">
        <Link href={`/me/checkouts`}>
          <TabsTrigger value="checkouts" className="w-full">
            Checkouts
          </TabsTrigger>
        </Link>
        <Link href={`/me/favourite-books`}>
          <TabsTrigger value="favourite" className="w-full">
            Favourite books
          </TabsTrigger>
        </Link>
        <Link href={`/me/fines`}>
          <TabsTrigger value="fines" className="w-full">
            Fines
          </TabsTrigger>
        </Link>
        <Link href={`/me/transactions`}>
          <TabsTrigger value="transactions" className="w-full">
            Transactions
          </TabsTrigger>
        </Link>
      </TabsList>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Book</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Created at</TableHead>
              <TableHead className="text-center">Due at</TableHead>
              <TableHead className="text-center">Returned at</TableHead>
              <TableHead className="text-center">Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 6 }).map((_, subIndex) => (
                  <TableCell key={`${index}_${subIndex}`}>
                    <Skeleton className="h-8 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Tabs>
  );
}
