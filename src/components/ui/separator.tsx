import type { PropsWithChildren } from 'react';

export function Separator({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-center gap-4 text-center">
      <div className="w-full border-b border-gray-300"></div>
      {children}
      <div className="w-full border-b border-gray-300"></div>
    </div>
  );
}
