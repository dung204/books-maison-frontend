'use client';

import { PropsWithChildren, useState } from 'react';

import AuthContext, { AuthContextValue } from '@/common/context/auth.context';

interface AuthProviderProps extends PropsWithChildren {
  initialTokens: Pick<AuthContextValue, 'accessToken' | 'refreshToken'>;
}

export default function AuthProvider({
  children,
  initialTokens,
}: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState(initialTokens.accessToken);
  const [refreshToken, setRefreshToken] = useState(initialTokens.refreshToken);

  const value: AuthContextValue = {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
