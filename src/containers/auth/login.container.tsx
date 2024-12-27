'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { OAuthAction } from '@/common/types/api/auth';
import { RouteUtils } from '@/common/utils/route.utils';
import { Button } from '@/components/ui/buttons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui/form';
import { GoogleIcon } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { authHttpClient } from '@/lib/http';
import { type LoginSchema, loginSchema } from '@/lib/validators';

export function LoginContainer() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData: LoginSchema) => {
    setIsLoggingIn(true);

    const res = await authHttpClient.login(formData);
    if (res) {
      await axios.post('/api/auth/set-cookie', res);
      document.location.href = '/';
    }
    setIsLoggingIn(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-4">
          <Button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </Button>
          <Separator>or</Separator>
          <Button
            type="button"
            variant="destructive"
            disabled={isLoggingIn}
            onClick={() =>
              RouteUtils.redirectToGoogleLoginPage({
                action: OAuthAction.AUTHENTICATE,
              })
            }
          >
            <GoogleIcon className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
        </div>
      </form>
    </Form>
  );
}
