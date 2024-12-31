'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ComponentProps, FormEvent } from 'react';

import { Button } from '@/components/ui/buttons';
import { Input } from '@/components/ui/form';
import { cn } from '@/lib/cn';

interface SearchBarContainerProps
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  fieldName: string;
  placeholder?: string;
}

export function SearchBarContainer({
  className,
  fieldName,
  placeholder,
  ...props
}: SearchBarContainerProps) {
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldValue = formData.get(fieldName) as string;
    const url = new URL(location.href);
    url.searchParams.set(fieldName, fieldValue);
    url.searchParams.set('page', '1');
    router.push(url.toString(), { scroll: false });
  };

  return (
    <form
      className={cn('grid grid-cols-12 gap-4', className)}
      onSubmit={handleSearch}
      {...props}
    >
      <div className="relative col-span-8 xs:col-span-9 sm:col-span-10">
        <Input
          type="text"
          placeholder={placeholder}
          className="rounded-full ps-10"
          id="search-bar"
          name={fieldName}
        />
        <label
          htmlFor="search-bar"
          className="absolute left-2 top-1/2 -translate-y-1/2"
        >
          <Search className="h-6 w-6" />
        </label>
      </div>
      <Button type="submit" className="col-span-4 xs:col-span-3 sm:col-span-2">
        Search
      </Button>
    </form>
  );
}
