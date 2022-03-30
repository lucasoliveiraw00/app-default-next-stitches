import { AuthProvider } from './contexts/auth';

import { useAuth } from './hooks/useAuth';

import { signIn } from './actions/sign-in';
import { signOut } from './actions/sign-out';
import { setPermission } from './actions/set-permission';

import { PermissionComponent } from './components/permission-component';

export {
  AuthProvider,
  useAuth,
  PermissionComponent,
  signIn,
  signOut,
  setPermission,
};
