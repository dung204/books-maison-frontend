'use client';

import { Book, List, MoveRight, Search, UserRoundPen } from 'lucide-react';
import Link from 'next/link';
import { ComponentProps, useEffect, useState } from 'react';

import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface GlobalSearchContainerProps extends ComponentProps<'div'> {
  asDialog?: boolean;
}

interface InternalGlobalSearchContainerProps extends ComponentProps<'div'> {
  onItemClick?: () => void;
}

export default function GlobalSearchContainer({
  asDialog = false,
}: GlobalSearchContainerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!asDialog) return;

    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setDialogOpen(open => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [asDialog]);

  if (asDialog) {
    return (
      <>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Search
                onClick={() => setDialogOpen(true)}
                className="cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to open the search dialog
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <CommandDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <InternalGlobalSearchContainer
            onItemClick={() => setDialogOpen(false)}
          />
        </CommandDialog>
      </>
    );
  }

  return <InternalGlobalSearchContainer />;
}

function InternalGlobalSearchContainer({
  onItemClick: handleCloseDialog,
}: InternalGlobalSearchContainerProps) {
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
          <Link
            href={`/books?title=${searchQuery}`}
            onClick={() => handleCloseDialog?.()}
          >
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
          <Link
            href={`/authors?name=${searchQuery}`}
            onClick={() => handleCloseDialog?.()}
          >
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
          <Link
            href={`/categories?name=${searchQuery}`}
            onClick={() => handleCloseDialog?.()}
          >
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
