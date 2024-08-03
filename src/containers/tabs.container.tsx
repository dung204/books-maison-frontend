'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps, PropsWithChildren, useEffect } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface TabDef {
  href: `/${string}`;
  label: string;
}

interface TabsContainerProps
  extends PropsWithChildren<ComponentProps<typeof Tabs>> {
  tabs: TabDef[];
}

export default function TabsContainer({
  children,
  className,
  tabs,
  ...props
}: TabsContainerProps) {
  const pathname = usePathname();

  return (
    <Tabs value={pathname} className={cn('w-full', className)} {...props}>
      <TabsList className="mb-6 grid w-full grid-cols-4">
        {tabs.map(tab => (
          <Link key={tab.href} href={tab.href} scroll={false}>
            <TabsTrigger value={tab.href} className="w-full">
              {tab.label}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
}
