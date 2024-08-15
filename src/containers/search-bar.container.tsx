'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchBarContainerProps
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  fieldName: string;
  placeholder?: string;
  onStartLoading?: () => void;
  onEndLoading?: () => void;
}

export default function SearchBarContainer({
  className,
  fieldName,
  placeholder,
  onStartLoading,
  onEndLoading,
  ...props
}: SearchBarContainerProps) {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onStartLoading?.();
    const formData = new FormData(e.currentTarget);
    const fieldValue = formData.get(fieldName) as string;
    const url = new URL(location.href);
    url.searchParams.set(fieldName, fieldValue);
    url.searchParams.set('page', '1');
    router.push(url.toString(), { scroll: false });
    setTimeout(() => {
      onEndLoading?.();
    }, 200);
  };

  return (
    <form
      className={cn('grid grid-cols-6 gap-4', className)}
      onSubmit={handleSearch}
      {...props}
    >
      <div className="relative col-span-5">
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
      <Button type="submit" className="col-span-1">
        Search
      </Button>
    </form>
  );
}
