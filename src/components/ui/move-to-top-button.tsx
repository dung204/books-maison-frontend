'use client';

import { MoveUp } from 'lucide-react';
import { ComponentProps, useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function MoveToTopButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    document.onscroll = () => {
      if (document.documentElement.scrollTop > 0) {
        buttonRef.current?.classList.add('opacity-100');
      } else {
        setTimeout(() => buttonRef.current?.classList.add('hidden'), 200);
        buttonRef.current?.classList.remove('opacity-100');
      }
    };
  }, []);

  const handleMoveToTop = () => {
    document.documentElement.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: 0,
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        ref={buttonRef}
        variant="secondary"
        className={cn(
          'rounded-full px-4 py-8 opacity-0 shadow-lg transition-all',
          className,
        )}
        onClick={handleMoveToTop}
        {...props}
      >
        <MoveUp className="h-14 w-8" />
      </Button>
    </div>
  );
}
