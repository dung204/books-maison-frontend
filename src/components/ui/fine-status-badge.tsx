import { ComponentProps } from 'react';

import { FineStatus } from '@/common/types/api/fine/fine-status.type';
import { Badge } from '@/components/ui/badge';
import ColoredBadge from '@/components/ui/colored-badge';

interface FineStatusBadgeProps extends ComponentProps<typeof Badge> {
  status: FineStatus;
}

export default function FineStatusBadge({ status }: FineStatusBadgeProps) {
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
