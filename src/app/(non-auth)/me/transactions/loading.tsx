import { DataTableSkeleton } from '@/components/ui/skeletons';

export default function TransactionsLoading() {
  return <DataTableSkeleton rowCount={4} />;
}
