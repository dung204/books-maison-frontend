'use client';

import axios, { AxiosError, HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';

import { OAuthAction } from '@/common/types/api/auth';
import type { User } from '@/common/types/api/user';
import type { GoogleUser } from '@/common/types/api/user/google-user.type';
import { RouteUtils } from '@/common/utils/route.utils';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
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
import LoadingIndicator from '@/components/ui/loading-indicator';
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/tables';
import { UserAvatar } from '@/components/ui/user-avatar';
import { authHttpClient } from '@/lib/http';

interface GoogleAuthContainerProps {
  code: string;
  action: OAuthAction;
  redirectUri?: string;
}

interface LinkUserAlertDialogProps {
  redirectUri?: string;
}

interface OverrideUserAlertDialogProps {
  redirectUri?: string;
  googleUser: GoogleUser;
  existingUser: User;
}

export function GoogleAuthContainer({
  code,
  action,
  redirectUri,
}: GoogleAuthContainerProps) {
  const [hasConflict, setHasConflict] = useState(false);
  const [googleUser, setGoogleUser] = useState<GoogleUser>();
  const [existingUser, setExistingUser] = useState<User>();

  useEffect(() => {
    (async () => {
      try {
        const res = await authHttpClient.googleAuth(code, action);
        await axios.post('/api/auth/set-cookie', res);
        RouteUtils.redirect(redirectUri ?? '/');
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          if (error.response?.status === HttpStatusCode.Conflict) {
            setHasConflict(true);
            const extra = JSON.parse(
              Buffer.from(error.response.data.extra, 'base64').toString(
                'utf-8',
              ),
            );
            setGoogleUser(extra.googleUserInfo);
            setExistingUser(extra.existingUser);
            return;
          }
        }
      }
    })();
  }, []);

  if (!hasConflict) {
    return (
      <>
        <LoadingIndicator className="h-32 w-32" />
        <h1 className="text-2xl font-bold">Logging you in...</h1>
        <p>Please wait while we process your login.</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold">
        A user that is not linked to Google has been found
      </h1>
      <p>Please choose one of the two options to continue</p>
      <div className="flex gap-4">
        <LinkUserAlertDialog />
        <OverrideUserAlertDialog
          googleUser={googleUser!}
          existingUser={existingUser!}
        />
      </div>
    </>
  );
}

function LinkUserAlertDialog({ redirectUri }: LinkUserAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Link the existing user to Google</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will link your Google account to the existing user. All
            your data still remains & you will be able to log in with Google in
            the future.
          </AlertDialogDescription>
          <AlertDialogDescription className="text-destructive">
            However, this action can NOT be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              RouteUtils.redirectToGoogleLoginPage({
                action: OAuthAction.LINK,
                redirectUri,
              })
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function OverrideUserAlertDialog({
  redirectUri,
  existingUser,
  googleUser,
}: OverrideUserAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          Override the existing user with Google profile
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will override the existing user with the Google profile.
            Your checkout, transaction history & favorite books still remains,
            but the following data will be overridden:
          </AlertDialogDescription>
          <Table className="text-sm">
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead className="text-center">Before</TableHead>
                <TableHead className="text-center">After</TableHead>
              </TableRow>
              <TableRow>
                <TableCell>First name</TableCell>
                <TableCell className="text-center">
                  {existingUser.firstName}
                </TableCell>
                <TableCell className="text-center">
                  {googleUser.given_name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Last name</TableCell>
                <TableCell className="text-center">
                  {existingUser.lastName}
                </TableCell>
                <TableCell className="text-center">
                  {googleUser.family_name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell className="flex justify-center">
                  <UserAvatar user={existingUser} height={32} />
                </TableCell>
                <TableCell>
                  <Avatar className="mx-auto h-8 w-8">
                    <AvatarImage
                      src={googleUser.picture}
                      alt={googleUser.name}
                    />
                  </Avatar>
                </TableCell>
              </TableRow>
            </TableHeader>
          </Table>
          <AlertDialogDescription className="text-destructive">
            This action can NOT be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              RouteUtils.redirectToGoogleLoginPage({
                action: OAuthAction.OVERRIDE,
                redirectUri,
              })
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
