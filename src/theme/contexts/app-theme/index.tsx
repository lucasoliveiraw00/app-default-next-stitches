import React, { createContext, useMemo, useState } from 'react';

import { globalDefaultStyles, defaultTheme } from '../../styles';

import { AppThemeDataContext, AppThemeProps } from './types';

export const AppThemeContext = createContext({} as AppThemeDataContext);

export const AppThemeProvider = ({
  children,
}: AppThemeProps): React.ReactElement => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const configTheme = useMemo(
    () => ({
      changeTheme: () => setIsDarkTheme(prevState => !prevState),
      mode: isDarkTheme ? 'dark' : 'default',
      theme: isDarkTheme ? undefined : defaultTheme,
    }),
    [isDarkTheme],
  );

  globalDefaultStyles();
  return (
    <AppThemeContext.Provider value={configTheme}>
      <div className={undefined}>{children}</div>
    </AppThemeContext.Provider>
  );
};
