import { LoaderCircle } from 'lucide-react';
import { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export default function LoadingIndicator({
  className,
  ...props
}: ComponentProps<typeof LoaderCircle>) {
  return <LoaderCircle className={cn('animate-spin', className)} {...props} />;
}
