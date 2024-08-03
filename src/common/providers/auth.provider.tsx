'use client';

import axios from 'axios';
import { PropsWithChildren, useEffect, useState } from 'react';

import AuthContext, { AuthContextValue } from '@/common/context/auth.context';
import { User } from '@/common/types/api/user.type';
import { SuccessResponse } from '@/common/types/success-response.type';

interface AuthProviderProps extends PropsWithChildren {
  initialTokens: Pick<AuthContextValue, 'accessToken' | 'refreshToken'>;
}

export default function AuthProvider({
  children,
  initialTokens: { accessToken, refreshToken },
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!accessToken && user) {
      setUser(null);
      return;
    }

    if (!user) {
      if (!accessToken) return;

      axios
        .get<
          SuccessResponse<User>
        >(`${process.env['NEXT_PUBLIC_API_ENDPOINT']}/users/me`, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then(res => setUser(res.data.data));
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
