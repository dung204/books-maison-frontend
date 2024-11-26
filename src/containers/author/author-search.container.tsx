'use client';

import { UserPen } from 'lucide-react';
import Link from 'next/link';
import { ComponentProps } from 'react';

import { Pagination } from '@/common/types';
import { Author, AuthorSearchParams } from '@/common/types/api/author';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PaginationContainer } from '@/containers';
import { SearchBarContainer } from '@/containers';

interface AuthorSearchContainerProps extends ComponentProps<'div'> {
  authors: Author[];
  pagination: Pagination;
  searchParams: AuthorSearchParams;
}

export function AuthorSearchContainer({
  authors,
  pagination,
  searchParams,
}: AuthorSearchContainerProps) {
  return (
    <div>
      <section className="w-1/2">
        <SearchBarContainer
          fieldName="name"
          placeholder="Enter a category name to search..."
        />
      </section>
      {searchParams.name && (
        <p className="mt-3">
          Showing categories containing name:{' '}
          <b>&quot;{searchParams.name}&quot;</b>
        </p>
      )}
      <section className="mt-6">
        <PaginationContainer pagination={pagination!} />
      </section>
      <section className="mt-10 grid grid-cols-4 gap-8">
        {authors.length === 0 ? (
          <p className="col-span-4 text-center">No books found</p>
        ) : (
          authors.map(({ id, imageUrl, name }) => (
            <Link
              key={id}
              href={`/author/${id}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="h-40 w-40">
                {imageUrl && <AvatarImage src={imageUrl} />}
                <AvatarFallback>
                  <UserPen className="h-20 w-20" />
                </AvatarFallback>
              </Avatar>
              <p className="mt-6 text-center text-xl">{name}</p>
            </Link>
          ))
        )}
      </section>
    </div>
  );
}
