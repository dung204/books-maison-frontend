'use client';

import axios from 'axios';
import {
  BookText,
  CircleDollarSign,
  Gavel,
  Heart,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import useAuth from '@/common/hooks/use-auth.hook';
import { User } from '@/common/types/api/user.type';
import { SuccessResponse } from '@/common/types/success-response.type';
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
  const { accessToken } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get<
        SuccessResponse<User>
      >(`${process.env['NEXT_PUBLIC_API_ENDPOINT']}/users/me`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(res => setUser(res.data.data));
  }, [accessToken]);

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
        <DropdownMenuLabel>
          {user.firstName} {user.lastName}
        </DropdownMenuLabel>
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
          <DropdownMenuItem className="cursor-pointer">
            <Gavel className="mr-2 h-4 w-4" />
            Fines
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <CircleDollarSign className="mr-2 h-4 w-4" />
            Transactions
          </DropdownMenuItem>
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
