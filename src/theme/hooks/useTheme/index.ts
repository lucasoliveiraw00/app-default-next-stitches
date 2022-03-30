import { useContext } from 'react';

import { AppThemeContext } from '../../contexts/app-theme';
import { AppThemeDataContext } from '../../contexts/app-theme/types';

export const useTheme = (): AppThemeDataContext => useContext(AppThemeContext);

export default useTheme;
