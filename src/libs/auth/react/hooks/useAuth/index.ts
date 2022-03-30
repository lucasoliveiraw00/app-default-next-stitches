import { useContext } from 'react';

import { AuthContext } from '../../contexts/auth';

import { AuthContextProps } from './types';

function useAuth<UserData>(): AuthContextProps<UserData> {
  return useContext(AuthContext);
}

export { useAuth };
