import { Dispatch, SetStateAction, createContext } from 'react';

import { User } from '@/common/types/api/user.type';

export interface AuthContextValue {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export default AuthContext;
