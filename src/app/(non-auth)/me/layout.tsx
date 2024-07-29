import axios from 'axios';
import { Clock, House, Mail, UserPen } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { User } from '@/common/types/api/user.type';
import { SuccessResponse } from '@/common/types/success-response.type';
import { StringUtils } from '@/common/utils/string.util';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import TabsContainer from '@/containers/tabs.container';

export async function generateMetadata() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const user = await getCurrentUser(accessToken!);

  return {
    title: `${user.firstName} ${user.lastName}`,
  };
}

export default async function UserLayout({ children }: PropsWithChildren) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const user = await getCurrentUser(accessToken!);

  return (
    <div className="container mt-[74px] grid grid-cols-12 gap-20 py-10">
      <div className="col-span-3">
        <div className="flex flex-col items-center">
          <Avatar className="h-72 w-72">
            <AvatarFallback className="text-6xl">
              {StringUtils.getFirstLettersUpperCase(
                `${user.firstName} ${user.lastName}`,
              )}
            </AvatarFallback>
          </Avatar>
          <h2 className="mt-6 text-3xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-8 items-center">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger className="col-span-1">
                  <Mail className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Email</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="col-span-7">{user.email}</span>
          </div>
          <div className="mt-4 grid grid-cols-8 items-center">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger className="col-span-1">
                  <House className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Address</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="col-span-7">{user.address}</span>
          </div>
          <div className="mt-4 grid grid-cols-8 items-center">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger className="col-span-1">
                  <Clock className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>First joined at</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="col-span-7">
              {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
                new Date(user.createdTimestamp),
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="col-span-9">
        <TabsContainer
          tabs={[
            { href: '/me/checkouts', label: 'Checkouts' },
            { href: '/me/favourite-books', label: 'Favourite books' },
            { href: '/me/fines', label: 'Fines' },
            { href: '/me/transactions', label: 'Transactions' },
          ]}
        >
          {children}
        </TabsContainer>
      </div>
    </div>
  );
}

async function getCurrentUser(accessToken: string) {
  const res = await axios.get<SuccessResponse<User>>(
    `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/users/me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return res.data.data;
}
