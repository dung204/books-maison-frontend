'use client';

import axios from 'axios';
import { BookText, CircleDollarSign, Gavel, Heart, LogOut } from 'lucide-react';
import Link from 'next/link';

import useAuth from '@/common/hooks/use-auth.hook';
import { StringUtils } from '@/common/utils/string.util';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LoadingIndicator from '@/components/ui/loading-indicator';

export default function UserMenuContainer() {
  const { user, accessToken } = useAuth();

  const handleLogout = async () => {
    await Promise.all([
      axios.delete(`/api/auth/delete-cookie`),
      axios.delete(`${process.env['NEXT_PUBLIC_API_ENDPOINT']}/auth/logout`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    ]);
    document.location.href = '/';
  };

  return !user ? (
    <LoadingIndicator />
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarFallback>
            {StringUtils.getFirstLettersUpperCase(
              `${user.firstName} ${user.lastName}`,
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <Link href="#">
          <DropdownMenuLabel>
            {user.firstName} {user.lastName}
          </DropdownMenuLabel>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/me/checkouts">
            <DropdownMenuItem className="cursor-pointer">
              <BookText className="mr-2 h-4 w-4" />
              Checkouts
            </DropdownMenuItem>
          </Link>
          <Link href="/me/favourite-books">
            <DropdownMenuItem className="cursor-pointer">
              <Heart className="mr-2 h-4 w-4" />
              Favourite books
            </DropdownMenuItem>
          </Link>
          <Link href="/me/fines">
            <DropdownMenuItem className="cursor-pointer">
              <Gavel className="mr-2 h-4 w-4" />
              Fines
            </DropdownMenuItem>
          </Link>
          <Link href="/me/transactions">
            <DropdownMenuItem className="cursor-pointer">
              <CircleDollarSign className="mr-2 h-4 w-4" />
              Transactions
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
