'use client';

import { PropsWithChildren, useEffect, useState } from 'react';

import AuthContext, { AuthContextValue } from '@/common/context/auth.context';
import { User } from '@/common/types/api/user/user.type';
import { userHttpClient } from '@/lib/http/user.http';

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
