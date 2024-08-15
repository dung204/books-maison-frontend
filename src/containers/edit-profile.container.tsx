'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { UserPen } from 'lucide-react';
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
import { userHttpClient } from '@/lib/http/user.http';
import {
  UpdateProfileSchema,
  updateProfileSchema,
} from '@/lib/validators/update-profile.validator';

export default function EditProfileContainer() {
  const { user, setUser, accessToken } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  const initialData = {
    firstName: !user ? '' : user.firstName,
    lastName: !user ? '' : user.lastName,
    email: !user ? '' : user.email,
    address: !user ? '' : user.address,
  };

  const form = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    values: {
      firstName: !user ? '' : user.firstName,
      lastName: !user ? '' : user.lastName,
      email: !user ? '' : user.email,
      address: !user ? '' : user.address,
    },
  });

  const onSubmit = async (formData: UpdateProfileSchema) => {
    try {
      setIsUpdating(true);

      const { data: updatedUser } = await userHttpClient.updateProfile(
        accessToken!,
        formData,
      );
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`Update profile failed: ${error.response?.data.message}`);
      }
    }
    setIsUpdating(false);
  };

  const handleResetEditProfileForm = (open: boolean) => {
    if (!open) {
      form.reset(initialData);
    }
  };

  return (
    !user || (
      <Dialog onOpenChange={handleResetEditProfileForm}>
        <DialogTrigger asChild>
          <Button type="button">
            <UserPen className="mr-2 h-4 w-4" />
            Edit profile
          </Button>
        </DialogTrigger>
        <DialogContent onOpenAutoFocus={e => e.preventDefault()}>
          <DialogTitle>Edit profile</DialogTitle>
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
                name="firstName"
                disabled={isUpdating}
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel required>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                disabled={isUpdating}
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel required>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                disabled={isUpdating}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel required>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                disabled={isUpdating}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    JSON.stringify(form.watch()) ==
                      JSON.stringify(initialData) || isUpdating
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
