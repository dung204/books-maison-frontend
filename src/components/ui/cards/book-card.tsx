import { Info, List, UserPen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';

import placeholderImg from '@/assets/images/placeholder-200x300.svg';
import { Book } from '@/common/types/api/book';
import { Button } from '@/components/ui/buttons';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/cards';
import { cn } from '@/lib/cn';

interface BookCardProps extends Omit<ComponentProps<typeof Link>, 'href'> {
  book: Book;
}

export function BookCard({ book, className, ...props }: BookCardProps) {
  return (
    <Link
      href={`/book/${book.id}`}
      className={cn('group', className)}
      {...props}
    >
      <Card className="overflow-hidden">
        <div className="relative h-[300px] overflow-hidden">
          <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/50 opacity-0 transition-all duration-500 group-hover:opacity-100">
            <Button variant="secondary">See Details</Button>
          </div>
          <Image
            src={book.imageUrl || placeholderImg}
            alt=""
            className="mx-auto object-contain transition-all duration-300 group-hover:scale-125"
            fill
          />
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-1 h-[1.2lh]">{book.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[9lh] flex-col gap-2">
          <div className="line-clamp-2">
            <UserPen className="me-2 inline-block h-4 w-4 -translate-y-[0.1rem]" />
            <span>
              {book.authors.length === 0
                ? 'N/A'
                : book.authors.map(author => author.name).join(', ')}
            </span>
          </div>
          <div className="line-clamp-2">
            <List className="me-2 inline-block h-4 w-4 -translate-y-[0.1rem]" />
            <span>
              {book.categories.length === 0
                ? 'N/A'
                : book.categories.map(category => category.name).join(', ')}
            </span>
          </div>
          <div className="line-clamp-3">
            <Info className="me-2 inline-block h-4 w-4 -translate-y-[0.1rem]" />
            <span>{book.description || 'N/A'}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
