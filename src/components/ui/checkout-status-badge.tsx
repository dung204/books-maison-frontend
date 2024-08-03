import { ComponentProps } from 'react';

import { CheckoutStatus } from '@/common/types/api/checkout-status.type';
import { Badge } from '@/components/ui/badge';
import ColoredBadge from '@/components/ui/colored-badge';

interface CheckoutStatusBadgeProps extends ComponentProps<typeof Badge> {
  status: CheckoutStatus;
}

export default function CheckoutStatusBadge({
  status,
}: CheckoutStatusBadgeProps) {
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
