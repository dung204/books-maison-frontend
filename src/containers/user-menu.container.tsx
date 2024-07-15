'use client';

import axios from 'axios';
import {
  BookText,
  CircleDollarSign,
  Gavel,
  Heart,
  LogOut,
  Settings,
  User as UserIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import useAuth from '@/common/hooks/use-auth.hook';
import { User } from '@/common/types/api/user.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { StringUtils } from '@/common/utils/string.util';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LoadingIndicator from '@/components/ui/loading-indicator';

export default function UserMenuContainer({}) {
  const { accessToken } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
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
      <DropdownMenuTrigger>
        <Avatar title={`${user.firstName} ${user.lastName}`}>
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
          <DropdownMenuItem className="cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <BookText className="mr-2 h-4 w-4" />
            Reading books
            <DropdownMenuShortcut>
              <Badge variant="destructive">1</Badge>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Heart className="mr-2 h-4 w-4" />
            Favourite books
            <DropdownMenuShortcut>
              <Badge variant="destructive">1</Badge>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Gavel className="mr-2 h-4 w-4" />
            Fines
            <DropdownMenuShortcut>
              <Badge variant="destructive">1</Badge>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <CircleDollarSign className="mr-2 h-4 w-4" />
            Transactions
            <DropdownMenuShortcut>
              <Badge variant="destructive">1</Badge>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
