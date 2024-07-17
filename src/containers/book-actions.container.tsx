'use client';

import axios from 'axios';
import { HandHelping, Heart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import useAuth from '@/common/hooks/use-auth.hook';
import { Book } from '@/common/types/api/book.type';
import { Checkout } from '@/common/types/api/checkout.type';
import { SuccessResponse } from '@/common/types/success-response.type';
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

interface BookActionsContainerProps {
  book: Book;
}

export default function BookActionsContainer({
  book,
}: BookActionsContainerProps) {
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
        await axios.delete(
          `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/favourite-books/delete/${book.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        setRemovingFromFavorites(false);
        setHasFavored(false);
        toast.success('Removed this books from favourites successfully!');
      } else {
        setAddingToFavorites(true);
        await axios.post(
          `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/favourite-books/add/${book.id}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        setAddingToFavorites(false);
        setHasFavored(true);
        toast.success('Added this books from favourites successfully!');
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
      await axios.post(
        `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/checkouts/me`,
        {
          bookId: book.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

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
        const getFavouriteBookUrl = new URL(
          `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/favourite-books/me`,
        );
        getFavouriteBookUrl.searchParams.append('title', book.title);
        if (book.publisher)
          getFavouriteBookUrl.searchParams.append('publisher', book.publisher);
        if (book.authors)
          book.authors.forEach(author =>
            getFavouriteBookUrl.searchParams.append('authorName', author.name),
          );
        if (book.categories)
          book.categories.forEach(category =>
            getFavouriteBookUrl.searchParams.append(
              'categoryIds',
              category.name,
            ),
          );
        if (book.publishedYear) {
          getFavouriteBookUrl.searchParams.append(
            'publishedYearFrom',
            book.publishedYear.toString(),
          );
          getFavouriteBookUrl.searchParams.append(
            'publishedYearTo',
            book.publishedYear.toString(),
          );
        }
        if (book.numberOfPages) {
          getFavouriteBookUrl.searchParams.append(
            'minPages',
            book.numberOfPages.toString(),
          );
          getFavouriteBookUrl.searchParams.append(
            'maxPages',
            book.numberOfPages.toString(),
          );
        }
        if (book.language)
          getFavouriteBookUrl.searchParams.append('language', book.language);

        const res = await axios.get<SuccessResponse<Book[]>>(
          getFavouriteBookUrl.href,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        setHasFavored(res.data.data.some(favorite => favorite.id === book.id));
      })(),

      (async () => {
        if (book.quantity === 0) return;

        const latestRentingCheckoutUrl = new URL(
          `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/checkouts/me`,
        );
        latestRentingCheckoutUrl.searchParams.append('bookId', book.id);
        latestRentingCheckoutUrl.searchParams.append('status', 'RENTING');

        const res = await axios.get<SuccessResponse<Checkout[]>>(
          latestRentingCheckoutUrl.href,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        setIsBorrowing(res.data.data.length > 0);
      })(),
    ]);
  }, [accessToken, book]);

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
