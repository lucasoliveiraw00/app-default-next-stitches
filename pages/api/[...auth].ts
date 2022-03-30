import { auth } from '../../src/libs/auth/server';

export default auth({
  signIn: async () => null,
  defaultPages: {
    default: '/dashboard',
    signIn: '/login',
  },
  publicPages: {
    signIn: '/login',
    recoverPassword: '/recuperar-senha',
  },
});
