import { ComponentProps } from 'react';

import { CheckoutStatus } from '@/common/types/api/checkout';
import { Badge, ColoredBadge } from '@/components/ui/badges';

interface CheckoutStatusBadgeProps extends ComponentProps<typeof Badge> {
  status: CheckoutStatus;
}

export function CheckoutStatusBadge({ status }: CheckoutStatusBadgeProps) {
  return (
    <ColoredBadge
      values={[
        {
          id: CheckoutStatus.BORROWING,
          color: '#eab308',
          text: CheckoutStatus.BORROWING,
        },
        {
          id: CheckoutStatus.RETURNED,
          color: '#22c55e',
          text: CheckoutStatus.RETURNED,
        },
        {
          id: CheckoutStatus.OVERDUE,
          color: '#ef4444',
          text: CheckoutStatus.OVERDUE,
        },
      ]}
      id={status}
    />
  );
}
