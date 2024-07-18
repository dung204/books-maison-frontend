'use client';

import { ChevronUp, MoveUp } from 'lucide-react';
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
        buttonRef.current?.classList.remove('cursor-default');
      } else {
        buttonRef.current?.classList.remove('opacity-100');
        buttonRef.current?.classList.add('cursor-default');
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
          'h-16 w-16 cursor-default rounded-full opacity-0 shadow-xl transition-all',
          className,
        )}
        onClick={handleMoveToTop}
        {...props}
      >
        <ChevronUp />
      </Button>
    </div>
  );
}
