import { Info } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { DataTableSkeleton } from '@/components/ui/skeletons';

export default function CheckoutsLoading() {
  return (
    <div className="rounded-md border">
      <Alert className="mb-6 bg-sky-100 text-sky-800">
        <Info className="h-4 w-4" color="rgb(7 89 133)" />
        <AlertDescription>
          Every time you borrow a book, a checkout is created. You can borrow a
          book for <b>14 days</b>
        </AlertDescription>
      </Alert>
      <DataTableSkeleton rowCount={7} />
    </div>
  );
}
