'use client';

import { HandHelping, Heart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type ComponentProps, useState } from 'react';
import { toast } from 'sonner';

import { useAuth } from '@/common/hooks';
import type { Book } from '@/common/types/api/book';
import { Button } from '@/components/ui/buttons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/dialogs';
import { checkoutHttpClient } from '@/lib/http';
import { favouriteBookHttpClient } from '@/lib/http';

interface BookActionsContainerProps {
  book: Book;
}

interface FavouriteButtonProps extends ComponentProps<typeof Button> {
  book: Book;
}

interface BorrowDialogProps {
  book: Book;
}

export function BookActionsContainer({ book }: BookActionsContainerProps) {
  const { accessToken } = useAuth();

  return (
    <div className="mt-6 flex justify-center gap-4">
      {!accessToken ? (
        <Link href="/auth/login">
          <Button>Login to borrow this book</Button>
        </Link>
      ) : (
        <>
          <BorrowDialog book={book} />
          <FavouriteButton book={book} />
        </>
      )}
    </div>
  );
}

function BorrowDialog({ book }: BorrowDialogProps) {
  const router = useRouter();
  const { accessToken } = useAuth();
  const [isBorrowing, setIsBorrowing] = useState<boolean | undefined>(
    book.userData?.isBorrowing,
  );

  const handleBorrowBook = async () => {
    try {
      if (!accessToken) return;

      setIsBorrowing(true);
      await checkoutHttpClient.createCheckout(accessToken, book.id);

      router.refresh();
      toast.success('Borrowed this book successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred!');
      setIsBorrowing(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={book.quantity === 0 || isBorrowing}
          variant={book.quantity === 0 || isBorrowing ? 'outline' : 'default'}
        >
          <HandHelping className="me-2 h-4 w-4" />{' '}
          {book.quantity === 0
            ? 'Can not borrow'
            : isBorrowing
              ? 'Borrowing'
              : 'Borrow'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to borrow this book?</AlertDialogTitle>
          <AlertDialogDescription>
            You can borrow this book for 14 days. If you do not return it, you
            will be fined (10.000 VND/day). This action can not be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleBorrowBook}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function FavouriteButton({ book, className, ...props }: FavouriteButtonProps) {
  const router = useRouter();
  const { accessToken } = useAuth();
  const [isHandlingFavourites, setIsHandlingFavourites] = useState(false);
  const [isFavouring, setIsFavouring] = useState<boolean | undefined>(
    book.userData?.isFavouring,
  );

  const handleToggleFavourite = async () => {
    if (!accessToken) return;

    try {
      if (isFavouring) {
        setIsHandlingFavourites(true);
        await favouriteBookHttpClient.removeBookFromFavourite(
          accessToken,
          book.id,
        );
        setIsHandlingFavourites(false);
        setIsFavouring(false);
        router.refresh();
        toast.success('Removed this book from favourites successfully!');
      } else {
        setIsHandlingFavourites(true);
        await favouriteBookHttpClient.addBookToFavourite(accessToken, book.id);
        setIsHandlingFavourites(false);
        setIsFavouring(true);
        router.refresh();
        toast.success('Added this book to favourites successfully!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred!');
      setIsHandlingFavourites(false);
    }
  };

  return (
    <Button
      variant={!isFavouring ? 'destructive' : 'outline'}
      onClick={handleToggleFavourite}
      disabled={isHandlingFavourites}
      className={className}
      {...props}
    >
      <Heart className="me-2 h-4 w-4" />{' '}
      {isHandlingFavourites
        ? 'Loading...'
        : isFavouring
          ? 'Remove from favourites'
          : 'Add to favourites'}
    </Button>
  );
}
