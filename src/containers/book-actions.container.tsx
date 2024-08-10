'use client';

import { HandHelping, Heart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import useAuth from '@/common/hooks/use-auth.hook';
import { Book } from '@/common/types/api/book/book.type';
import { CheckoutStatus } from '@/common/types/api/checkout/checkout-status.type';
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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { checkoutHttpClient } from '@/lib/http/checkout.http';
import { favouriteBookHttpClient } from '@/lib/http/favourite-book.http';

interface BookActionsContainerProps {
  book: Book;
}

export default function BookActionsContainer({
  book,
}: BookActionsContainerProps) {
  const router = useRouter();
  const { accessToken } = useAuth();
  const [addingToFavorites, setAddingToFavorites] = useState(false);
  const [removingFromFavorites, setRemovingFromFavorites] = useState(false);
  const [hasFavored, setHasFavored] = useState<boolean | undefined>();
  const [isBorrowing, setIsBorrowing] = useState<boolean | undefined>();

  const handleToggleFavourite = async () => {
    if (!accessToken) return;

    try {
      if (hasFavored) {
        setRemovingFromFavorites(true);
        await favouriteBookHttpClient.removeBookFromFavourite(
          accessToken,
          book.id,
        );
        setRemovingFromFavorites(false);
        setHasFavored(false);
        router.refresh();
        toast.success('Removed this book from favourites successfully!');
      } else {
        setAddingToFavorites(true);
        await favouriteBookHttpClient.addBookToFavourite(accessToken, book.id);
        setAddingToFavorites(false);
        setHasFavored(true);
        router.refresh();
        toast.success('Added this book from favourites successfully!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred!');
      setAddingToFavorites(false);
      setRemovingFromFavorites(false);
    }
  };

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

  useEffect(() => {
    if (!accessToken) return;
    Promise.all([
      (async () => {
        if (typeof hasFavored === 'boolean') return;

        const { data } = await favouriteBookHttpClient.checkHasFavoured(
          accessToken,
          book.id,
        );

        setHasFavored(data);
      })(),

      (async () => {
        if (typeof isBorrowing === 'boolean' || book.quantity === 0) return;
        const { data } = await checkoutHttpClient.getCheckoutsOfCurrentUser(
          accessToken,
          {
            bookId: book.id,
            status: CheckoutStatus.BORROWING,
          },
        );
        setIsBorrowing(data.length > 0);
      })(),
    ]);
  }, [accessToken, book, hasFavored, isBorrowing]);

  return (
    <div className="mt-6 flex justify-center gap-4">
      {!accessToken ? (
        <Link href="/auth/login">
          <Button>Login to borrow this book</Button>
        </Link>
      ) : (
        <>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={
                  book.quantity === 0 ||
                  typeof isBorrowing === 'undefined' ||
                  isBorrowing
                }
                variant={
                  book.quantity === 0 ||
                  typeof isBorrowing === 'undefined' ||
                  isBorrowing
                    ? 'outline'
                    : 'default'
                }
              >
                <HandHelping className="me-2 h-4 w-4" />{' '}
                {book.quantity === 0
                  ? 'Can not borrow'
                  : typeof isBorrowing === 'undefined'
                    ? 'Checking...'
                    : isBorrowing
                      ? 'Borrowing'
                      : 'Borrow'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure to borrow this book?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You can borrow this book for 14 days. If you do not return it,
                  you will be fined (10.000 VND/day). This action can not be
                  undone.
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
          <Button
            variant={
              typeof hasFavored === 'boolean' && !hasFavored
                ? 'destructive'
                : 'outline'
            }
            onClick={handleToggleFavourite}
            disabled={
              addingToFavorites ||
              removingFromFavorites ||
              typeof hasFavored === 'undefined'
            }
          >
            <Heart className="me-2 h-4 w-4" />{' '}
            {addingToFavorites
              ? 'Adding to favorites...'
              : removingFromFavorites
                ? 'Removing from favorites...'
                : typeof hasFavored === 'undefined'
                  ? 'Checking...'
                  : hasFavored
                    ? 'Remove from favourites'
                    : 'Add to favourites'}
          </Button>
        </>
      )}
    </div>
  );
}
