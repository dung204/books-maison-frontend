import { ComponentProps } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface AuthorsGridLoadingProps extends ComponentProps<'section'> {}

export default function AuthorsGridLoading({
  className,
  ...props
}: AuthorsGridLoadingProps) {
  return (
    <section className={cn('grid grid-cols-4 gap-8', className)} {...props}>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center justify-center">
          <Avatar className="h-40 w-40">
            <AvatarFallback>
              <Skeleton className="h-full w-full" />
            </AvatarFallback>
          </Avatar>
          <div className="mt-6 h-[1.2lh] w-2/3">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      ))}
    </section>
  );
}
