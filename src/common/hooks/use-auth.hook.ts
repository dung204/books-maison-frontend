import { useContext } from 'react';

import AuthContext from '@/common/context/auth.context';

export default function useAuth() {
  const value = useContext(AuthContext);

  if (value === null)
    throw new Error('useAuthContext must be used inside of AuthContext.');

  return value;
}
