'use client';

import { Book, List, MoveRight, UserRoundPen } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

export default function GlobalSearchBarContainer() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
  };

  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);

  return (
    <Command shouldFilter={false} className="rounded-lg border shadow-md">
      <CommandInput
        value={searchQuery}
        onValueChange={handleInputChange}
        placeholder="Search by book titles, author names, categories names, ..."
      />
      <CommandList className={cn({ hidden: searchQuery.length === 0 })}>
        <CommandGroup
          heading={
            <div className="flex items-center gap-1">
              <Book className="h-4 w-4" />
              Books
            </div>
          }
        >
          <Link href={`/search?title=${searchQuery}`}>
            <CommandItem>
              See all books containing title &quot;{searchQuery}&quot;
              <CommandShortcut>
                <MoveRight className="h-5 w-5" />
              </CommandShortcut>
            </CommandItem>
          </Link>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup
          heading={
            <div className="flex items-center gap-1">
              <UserRoundPen className="h-4 w-4" />
              Authors
            </div>
          }
        >
          <Link href={`/authors?name=${searchQuery}`}>
            <CommandItem>
              See all authors containing name &quot;{searchQuery}&quot;
              <CommandShortcut>
                <MoveRight className="h-5 w-5" />
              </CommandShortcut>
            </CommandItem>
          </Link>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup
          heading={
            <div className="flex items-center gap-1">
              <List className="h-4 w-4" />
              Categories
            </div>
          }
        >
          <Link href={`/categories?name=${searchQuery}`}>
            <CommandItem>
              See all categories containing name &quot;{searchQuery}&quot;
              <CommandShortcut>
                <MoveRight className="h-5 w-5" />
              </CommandShortcut>
            </CommandItem>
          </Link>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
