'use client';

import { Clock, House, Mail } from 'lucide-react';

import { useAuth } from '@/common/hooks';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeletons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserAvatar } from '@/components/ui/user-avatar';
import {
  ChangePasswordContainer,
  EditProfileContainer,
  UploadAvatarContainer,
} from '@/containers/user';

export function UserProfileContainer() {
  const { user } = useAuth();

  if (!user) {
    return (
      <>
        <div className="flex flex-col items-center">
          <div className="relative">
            <Avatar className="h-72 w-72">
              <AvatarFallback>
                <Skeleton className="h-full w-full" />
              </AvatarFallback>
            </Avatar>
          </div>
          <Skeleton className="mb-2 mt-6 h-10 w-full" />
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-8 items-center">
            <div className="col-span-1">
              <Mail className="h-4 w-4" />
            </div>
            <span className="col-span-7">
              <Skeleton className="h-4 w-full" />
            </span>
          </div>
          <div className="mt-4 grid grid-cols-8 items-center">
            <div className="col-span-1">
              <House className="h-4 w-4" />
            </div>
            <span className="col-span-7">
              <Skeleton className="h-4 w-full" />
            </span>
          </div>
          <div className="mt-4 grid grid-cols-8 items-center">
            <div className="col-span-1">
              <Clock className="h-4 w-4" />
            </div>
            <span className="col-span-7">
              <Skeleton className="h-4 w-full" />
            </span>
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </>
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="relative">
          <UserAvatar height={288} fallbackFontSize={62} />
          <UploadAvatarContainer className="absolute bottom-[15%] right-0" />
        </div>
        <h2 className="mb-2 mt-6 text-3xl font-semibold">{fullName}</h2>
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
      <div className="mt-8 flex justify-center gap-4">
        <EditProfileContainer />
        <ChangePasswordContainer />
      </div>
    </>
  );
}
