import type { ComponentProps } from 'react';

import { FineStatus } from '@/common/types/api/fine';
import { Badge, ColoredBadge } from '@/components/ui/badges';

interface FineStatusBadgeProps extends ComponentProps<typeof Badge> {
  status: FineStatus;
}

export function FineStatusBadge({ status }: FineStatusBadgeProps) {
  return (
    <ColoredBadge
      values={[
        {
          id: FineStatus.ISSUED,
          color: '#eab308',
          text: FineStatus.ISSUED,
        },
        {
          id: FineStatus.PAID,
          color: '#22c55e',
          text: FineStatus.PAID,
        },
        {
          id: FineStatus.CANCELLED,
          color: '#ef4444',
          text: FineStatus.CANCELLED,
        },
      ]}
      id={status}
    />
  );
}
