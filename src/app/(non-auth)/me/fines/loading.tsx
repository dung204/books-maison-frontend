import { Info } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { DataTableSkeleton } from '@/components/ui/skeletons';

export default function FinesLoading() {
  return (
    <div className="rounded-md border">
      <Alert className="mb-6 bg-sky-100 text-sky-800">
        <Info className="h-4 w-4" color="rgb(7 89 133)" />
        <AlertDescription>
          The amount of one fine is{' '}
          <b>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(10000)}{' '}
            per overdue day
          </b>
        </AlertDescription>
      </Alert>
      <DataTableSkeleton rowCount={6} />
    </div>
  );
}
