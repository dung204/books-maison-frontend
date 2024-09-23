'use client';

import axios, { InternalAxiosRequestConfig } from 'axios';
import * as jose from 'jose';
import { PropsWithChildren, useEffect, useState } from 'react';

import AuthContext, { AuthContextValue } from '@/common/context/auth.context';
import { User } from '@/common/types/api/user/user.type';
import { LoginSuccessResponse } from '@/common/types/login-success-response.type';
import { authHttpClient } from '@/lib/http/auth.http';
import { checkoutHttpClient } from '@/lib/http/checkout.http';
import { favouriteBookHttpClient } from '@/lib/http/favourite-book.http';
import { fineHttpClient } from '@/lib/http/fine.http';
import { transactionHttpClient } from '@/lib/http/transaction.http';
import { userHttpClient } from '@/lib/http/user.http';

interface AuthProviderProps extends PropsWithChildren {
  initialTokens: Pick<AuthContextValue, 'accessToken' | 'refreshToken'>;
}

export default function AuthProvider({
  children,
  initialTokens,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState(initialTokens.accessToken);
  const [refreshToken, setRefreshToken] = useState(initialTokens.refreshToken);

  useEffect(() => {
    const handleRefreshToken = async (
      config: InternalAxiosRequestConfig<any>,
    ) => {
      if (config.headers.hasAuthorization(/Bearer(.*)/g)) {
        const accessToken = config.headers
          .getAuthorization(/Bearer(.*)/g)?.[0]
          .replaceAll('Bearer ', '');
        const jwtAccessSecret = new TextEncoder().encode(
          process.env['NEXT_PUBLIC_JWT_ACCESS_SECRET']!,
        );

        try {
          await jose.jwtVerify(accessToken!, jwtAccessSecret);
        } catch (accessTokenError) {
          try {
            const res = await axios.post<LoginSuccessResponse>(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
              { refreshToken },
            );
            const newAccessToken = res.data.data.accessToken;
            const newRefreshToken = res.data.data.refreshToken;

            await axios.post('/api/auth/set-cookie', res);

            config.headers.setAuthorization(`Bearer ${newAccessToken}`, true);
            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);
          } catch (refreshTokenError) {
            setAccessToken(undefined);
            setRefreshToken(undefined);
            setUser(null);
            await axios.delete('/api/auth/delete-cookie');
          }
        }
      }
      return config;
    };

    authHttpClient.setupRequestInterceptors(handleRefreshToken);
    checkoutHttpClient.setupRequestInterceptors(handleRefreshToken);
    favouriteBookHttpClient.setupRequestInterceptors(handleRefreshToken);
    fineHttpClient.setupRequestInterceptors(handleRefreshToken);
    transactionHttpClient.setupRequestInterceptors(handleRefreshToken);
    userHttpClient.setupRequestInterceptors(handleRefreshToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!accessToken && user) {
      setUser(null);
      return;
    }

    if (!user) {
      if (!accessToken) return;

      userHttpClient
        .getUserProfile(accessToken)
        .then(({ data }) => setUser(data));
    }
  }, [accessToken, user]);

  const value: AuthContextValue = {
    accessToken,
    refreshToken,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
