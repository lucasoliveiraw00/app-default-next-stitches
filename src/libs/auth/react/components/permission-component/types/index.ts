import { ReactElement } from 'react';

export type PermissionComponentProps = {
  permission: string;
  children: ReactElement | ReactElement[];
};
