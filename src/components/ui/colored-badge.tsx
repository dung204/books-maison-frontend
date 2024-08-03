import { CSSProperties, ComponentProps } from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ColoredBadgeValue {
  id: string;
  color: CSSProperties['backgroundColor'];
  text: string;
}

interface ColoredBadgeProps extends ComponentProps<typeof Badge> {
  values: ColoredBadgeValue[];
  id: string;
}

export default function ColoredBadge({
  values,
  id,
  className,
  style,
  ...props
}: ColoredBadgeProps) {
  return (
    <Badge
      className={cn('hover:opacity-80', 'transition-all', className)}
      style={{
        backgroundColor: values.find(value => value.id === id)?.color,
        ...style,
      }}
      {...props}
    >
      {values.find(value => value.id === id)?.text}
    </Badge>
  );
}
