'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

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
        <Button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Form>
  );
}
