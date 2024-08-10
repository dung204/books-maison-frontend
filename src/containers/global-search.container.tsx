'use client';

import { AvatarFallback } from '@radix-ui/react-avatar';
import {
  Book as BookIcon,
  List,
  MoveRight,
  Search,
  UserPen,
  UserRoundPen,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ComponentProps, useEffect, useState } from 'react';

import placeholderImg from '@/assets/images/placeholder-200x300.svg';
import useDebounce from '@/common/hooks/use-debounce.hook';
import { Author } from '@/common/types/api/author/author.type';
import { Book } from '@/common/types/api/book/book.type';
import { Category } from '@/common/types/api/category/category.type';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
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
import LoadingIndicator from '@/components/ui/loading-indicator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { authorHttpClient } from '@/lib/http/author.http';
import { bookHttpClient } from '@/lib/http/book.http';
import { categoryHttpClient } from '@/lib/http/category.http';
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
  onItemClick,
}: InternalGlobalSearchContainerProps) {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
  const [searchedAuthors, setSearchedAuthors] = useState<Author[]>([]);
  const [searchedCategories, setSearchedCategories] = useState<Category[]>([]);

  const debouncedSearch = useDebounce(async (value: string) => {
    const [booksRes, authorsRes, categoriesRes] = await Promise.all([
      bookHttpClient.getAllBooks({ title: value }),
      authorHttpClient.getAllAuthors({ name: value }),
      categoryHttpClient.getAllCategories({ name: value }),
    ]);

    setSearchedBooks(booksRes.data);
    setSearchedAuthors(authorsRes.data);
    setSearchedCategories(categoriesRes.data);
    setIsSearching(false);
  }, 500);

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    if (value.length === 0) {
      setSearchedBooks([]);
      setSearchedAuthors([]);
      setSearchedCategories([]);
      return;
    }

    setIsSearching(true);
    debouncedSearch(value);
  };

  const handleRedirectToUrl = (url: string) => {
    router.push(url);
    onItemClick?.();
  };

  return (
    <Command
      shouldFilter={false}
      className="rounded-lg border shadow-md outline-none"
    >
      <CommandInput
        value={searchQuery}
        onValueChange={handleInputChange}
        placeholder="Search by book titles, author names, categories names, ..."
      />
      <CommandList className={cn({ hidden: searchQuery.length === 0 })}>
        {isSearching ? (
          <CommandItem
            className={cn(
              { hidden: searchedBooks.length === 0 },
              'flex',
              'justify-center',
              'items-center',
              'py-6',
            )}
          >
            <LoadingIndicator className="h-6 w-6" />
          </CommandItem>
        ) : (
          <>
            <CommandGroup
              className={cn({ hidden: searchedBooks.length === 0 })}
              heading={
                <div className="flex items-center gap-1">
                  <BookIcon className="h-4 w-4" />
                  Books
                </div>
              }
            >
              {searchedBooks.map(book => (
                <Link
                  className="group"
                  key={book.id}
                  href={`/book/${book.id}`}
                  onClick={() => onItemClick?.()}
                >
                  <CommandItem
                    className="group-hover:bg-accent"
                    value={book.id}
                    onSelect={() => handleRedirectToUrl(`/book/${book.id}`)}
                  >
                    <div className="grid h-12 w-full grid-cols-12 grid-rows-2 gap-x-2">
                      <div className="relative col-span-1 row-span-2">
                        <Image
                          src={book.imageUrl || placeholderImg}
                          alt={book.title}
                          fill
                        />
                      </div>
                      <div className="col-span-10 row-span-1 line-clamp-1 text-base font-semibold">
                        {book.title}
                      </div>
                      <div className="col-span-10 row-span-1 line-clamp-1 text-sm">
                        {book.authors.length > 0 ? (
                          book.authors.map(author => author.name).join(', ')
                        ) : (
                          <span className="italic">Unknown author</span>
                        )}
                      </div>
                    </div>
                    <CommandShortcut>
                      <MoveRight className="h-5 w-5" />
                    </CommandShortcut>
                  </CommandItem>
                </Link>
              ))}
              <Link
                className="group"
                href={`/books?title=${searchQuery}`}
                onClick={() => onItemClick?.()}
              >
                <CommandItem
                  className="group-hover:bg-accent"
                  onSelect={() =>
                    handleRedirectToUrl(`/books?title=${searchQuery}`)
                  }
                >
                  See all books containing title &quot;{searchQuery}&quot;
                  <CommandShortcut>
                    <MoveRight className="h-5 w-5" />
                  </CommandShortcut>
                </CommandItem>
              </Link>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup
              className={cn({ hidden: searchedAuthors.length === 0 })}
              heading={
                <div className="flex items-center gap-1">
                  <UserRoundPen className="h-4 w-4" />
                  Authors
                </div>
              }
            >
              {searchedAuthors.map(author => (
                <Link
                  className="group"
                  key={author.id}
                  href={`/author/${author.id}`}
                  onClick={() => onItemClick?.()}
                >
                  <CommandItem
                    className="group-hover:bg-accent"
                    value={author.id}
                    onSelect={() => handleRedirectToUrl(`/author/${author.id}`)}
                  >
                    <Avatar>
                      {author.imageUrl && <AvatarImage src={author.imageUrl} />}
                      <AvatarFallback className="flex h-10 w-10 items-center justify-center">
                        <UserPen />
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3 text-base font-semibold">
                      {author.name}
                    </div>
                    <CommandShortcut>
                      <MoveRight className="h-5 w-5" />
                    </CommandShortcut>
                  </CommandItem>
                </Link>
              ))}
              <Link
                className="group"
                href={`/authors?name=${searchQuery}`}
                onClick={() => onItemClick?.()}
              >
                <CommandItem
                  className="group-hover:bg-accent"
                  onSelect={() =>
                    handleRedirectToUrl(`/authors?name=${searchQuery}`)
                  }
                >
                  See all authors containing name &quot;{searchQuery}&quot;
                  <CommandShortcut>
                    <MoveRight className="h-5 w-5" />
                  </CommandShortcut>
                </CommandItem>
              </Link>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup
              className={cn({ hidden: searchedCategories.length === 0 })}
              heading={
                <div className="flex items-center gap-1">
                  <List className="h-4 w-4" />
                  Categories
                </div>
              }
            >
              {searchedCategories.map(category => (
                <Link
                  className="group"
                  key={category.id}
                  href={`/books?categoryId=${category.id}`}
                  onClick={() => onItemClick?.()}
                >
                  <CommandItem
                    className="group-hover:bg-accent"
                    value={category.id}
                    onSelect={() =>
                      handleRedirectToUrl(`/books?categoryId=${category.id}`)
                    }
                  >
                    <span className="hidden">{category.id}</span>
                    <div className="text-base font-semibold">
                      {category.name}
                    </div>
                    <CommandShortcut>
                      <MoveRight className="h-5 w-5" />
                    </CommandShortcut>
                  </CommandItem>
                </Link>
              ))}
              <Link
                className="group"
                href={`/categories?name=${searchQuery}`}
                onClick={() => onItemClick?.()}
              >
                <CommandItem
                  className="group-hover:bg-accent"
                  onSelect={() =>
                    handleRedirectToUrl(`/categories?name=${searchQuery}`)
                  }
                >
                  See all categories containing name &quot;{searchQuery}&quot;
                  <CommandShortcut>
                    <MoveRight className="h-5 w-5" />
                  </CommandShortcut>
                </CommandItem>
              </Link>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  );
}
