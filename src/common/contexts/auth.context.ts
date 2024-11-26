'use client';

import { Dispatch, SetStateAction, createContext } from 'react';

import { User } from '@/common/types/api/user';

export interface AuthContextValue {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
