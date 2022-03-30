import React from 'react';

import { useAuth } from '../../hooks/useAuth';

import { PermissionComponentProps } from './types';

export const PermissionComponent = (props: PermissionComponentProps) => {
  const { hasPermission } = useAuth();
  const { permission, children } = props;
  const canShowResource = hasPermission(permission);
  if (canShowResource) return null;
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
