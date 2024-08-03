import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { Lock } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import useAuth from '@/common/hooks/use-auth.hook';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  ChangePasswordSchema,
  changePasswordSchema,
} from '@/lib/validators/change-password.validator';

const defaultValues = {
  password: '',
  newPassword: '',
  confirmPassword: '',
};

export default function ChangePasswordContainer() {
  const { user, accessToken } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues,
  });

  const onSubmit = async ({ password, newPassword }: ChangePasswordSchema) => {
    try {
      setIsUpdating(true);
      await axios.patch(
        `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/users/me/password`,
        {
          password,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
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

  const handleResetForm = (open: boolean) => {
    if (!open) {
      form.reset(defaultValues);
    }
  };

  return (
    !user || (
      <Dialog onOpenChange={handleResetForm}>
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
                  type="submit"
                  disabled={
                    JSON.stringify(form.watch()) ===
                      JSON.stringify(defaultValues) || isUpdating
                  }
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    )
  );
}
