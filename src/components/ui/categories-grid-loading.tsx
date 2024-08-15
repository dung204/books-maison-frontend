import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoriesGridLoading() {
  return Array.from({ length: 10 }).map((_, index) => (
    <Card key={index} className="h-44 w-full">
      <Skeleton className="h-full w-full" />
    </Card>
  ));
}
