'use client';

import { Clock, House, Mail } from 'lucide-react';

import useAuth from '@/common/hooks/use-auth.hook';
import { StringUtils } from '@/common/utils/string.util';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import ChangePasswordContainer from '@/containers/change-password.container';
import EditProfileContainer from '@/containers/edit-profile.container';

export default function UserProfileContainer() {
  const { user } = useAuth();
  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <>
      <div className="flex flex-col items-center">
        <Avatar className="h-72 w-72">
          <AvatarFallback className="text-6xl">
            {!user ? (
              <Skeleton className="h-full w-full" />
            ) : (
              StringUtils.getFirstLettersUpperCase(`${fullName}`)
            )}
          </AvatarFallback>
        </Avatar>
        {!user ? (
          <Skeleton className="mb-2 mt-6 h-10 w-full" />
        ) : (
          <h2 className="mb-2 mt-6 text-3xl font-semibold">{fullName}</h2>
        )}
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
          <span className="col-span-7">
            {!user ? <Skeleton className="h-4 w-full" /> : user.email}
          </span>
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
          <span className="col-span-7">
            {!user ? <Skeleton className="h-4 w-full" /> : user.address}
          </span>
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
            {!user ? (
              <Skeleton className="h-4 w-full" />
            ) : (
              new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
                new Date(user.createdTimestamp),
              )
            )}
          </span>
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-4">
        <EditProfileContainer />
        <ChangePasswordContainer />
      </div>
    </>
  );
}
