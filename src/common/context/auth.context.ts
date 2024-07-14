import { Dispatch, SetStateAction, createContext } from 'react';

export interface AuthContextValue {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  setAccessToken: Dispatch<SetStateAction<string | undefined>>;
  setRefreshToken: Dispatch<SetStateAction<string | undefined>>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export default AuthContext;
