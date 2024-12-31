'use client';

import { ChevronUp } from 'lucide-react';
import { type ComponentProps, useEffect, useRef } from 'react';

import { Button } from '@/components/ui/buttons';
import { cn } from '@/lib/cn';

export function MoveToTopButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const scrollArea = document.querySelector<HTMLDivElement>(
      '[data-radix-scroll-area-viewport]',
    );
    scrollArea!.onscroll = () => {
      if (scrollArea!.scrollTop > 0) {
        buttonRef.current?.classList.add('opacity-100');
        buttonRef.current?.classList.remove('cursor-default');
      } else {
        buttonRef.current?.classList.remove('opacity-100');
        buttonRef.current?.classList.add('cursor-default');
      }
    };
  }, []);

  const handleMoveToTop = () => {
    document
      .querySelector<HTMLDivElement>('[data-radix-scroll-area-viewport]')!
      .scrollTo({
        behavior: 'smooth',
        left: 0,
        top: 0,
      });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-xs:bottom-3 max-xs:right-3">
      <Button
        ref={buttonRef}
        variant="secondary"
        className={cn(
          'h-14 w-14 cursor-default rounded-full opacity-0 shadow-xl transition-all max-xs:h-12 max-xs:w-12',
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
