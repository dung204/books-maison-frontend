import { SortDirection } from '@tanstack/react-table';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { ComponentProps } from 'react';

interface SortingIconProps extends ComponentProps<typeof ArrowUp> {
  isSorted: false | SortDirection;
}

export default function SortingIcon({ isSorted, ...props }: SortingIconProps) {
  if (!isSorted) {
    return null;
  }

  return isSorted === 'asc' ? <ArrowUp {...props} /> : <ArrowDown {...props} />;
}
