import { Session } from '../../server/types';

export function getPropertyDescriptorForReqSession(
  sessionData: Session | undefined,
) {
  return {
    enumerable: true,
    get() {
      return sessionData;
    },
  };
}
