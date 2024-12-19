'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError, HttpStatusCode } from 'axios';
import { Lock } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useAuth } from '@/common/hooks';
import { Button } from '@/components/ui/buttons';
import {
  ConfirmDiscardChangesDialog,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialogs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui/form';
import { userHttpClient } from '@/lib/http';
import {
  type ChangePasswordSchema,
  changePasswordSchema,
} from '@/lib/validators';

const defaultValues = {
  password: '',
  newPassword: '',
  confirmPassword: '',
};

export function ChangePasswordContainer() {
  const { accessToken } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDiscardChangesDialogOpen, setIsDiscardChangesDialogOpen] =
    useState(false);
  const [open, setOpen] = useState(false);
  const saveButtonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues,
  });

  const onSubmit = async ({ password, newPassword }: ChangePasswordSchema) => {
    try {
      setIsUpdating(true);
      await userHttpClient.changePassword(accessToken!, {
        password,
        newPassword,
      });
      toast.success('Password changed successfully!');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const { response } = error;
        if (response?.status === HttpStatusCode.Unauthorized) {
          form.setError('password', {
            type: 'value',
            message: response?.data.message,
          });
          setIsUpdating(false);
          return;
        }
      }

      toast.error('An error occurred!');
    }
    setIsUpdating(false);
  };

  const handleResetChangePasswordForm = (open: boolean) => {
    if (!open) {
      if (isUpdating) {
        setOpen(true);
        return;
      }

      if (!saveButtonRef.current?.disabled) {
        setOpen(true);
        setIsDiscardChangesDialogOpen(true);
        return;
      }

      form.reset(defaultValues);
    }
    setOpen(open);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleResetChangePasswordForm}>
        <DialogTrigger asChild>
          <Button type="button" variant="secondary">
            <Lock className="mr-2 h-4 w-4" />
            Change password
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Change password</DialogTitle>
          <DialogDescription>
            Click the Save button to save your changes.
          </DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-10"
            >
              <FormField
                control={form.control}
                name="password"
                disabled={isUpdating}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel required>Old password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                disabled={isUpdating}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel required>New password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                disabled={isUpdating}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel required>Confirm password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="col-span-2">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={isUpdating}
                  >
                    Close
                  </Button>
                </DialogClose>
                <Button
                  ref={saveButtonRef}
                  type="submit"
                  disabled={
                    form.watch('password') === '' ||
                    form.watch('newPassword') === '' ||
                    form.watch('confirmPassword') === '' ||
                    isUpdating
                  }
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <ConfirmDiscardChangesDialog
        open={isDiscardChangesDialogOpen}
        onOpenChange={setIsDiscardChangesDialogOpen}
        onDiscard={() => {
          setIsDiscardChangesDialogOpen(false);
          setOpen(false);
          form.reset(defaultValues);
        }}
      />
    </>
  );
}
