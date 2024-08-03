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

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <>
      <div className="flex flex-col items-center">
        <Avatar className="h-72 w-72">
          <AvatarFallback className="text-6xl">
            <Skeleton className="h-full w-full" />
          </AvatarFallback>
        </Avatar>
        <h2 className="mt-6 text-3xl font-semibold">
          <Skeleton className="h-4 w-full" />
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
          <span className="col-span-7">
            <Skeleton className="h-2 w-full" />
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
            <Skeleton className="h-2 w-full" />
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
            <Skeleton className="h-2 w-full" />
          </span>
        </div>
      </div>
    </>
  );
}
