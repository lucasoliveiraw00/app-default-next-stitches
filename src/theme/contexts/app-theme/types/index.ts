import React from 'react';

import { DefaultTheme } from '../../../styles/types';

export type AppThemeProps = {
  children: React.ReactElement | React.ReactElement[];
};

export type AppThemeDataContext = {
  mode: 'default' | 'dark' | string;
  theme: DefaultTheme | undefined;
  changeTheme: () => void;
};
