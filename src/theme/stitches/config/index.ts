import { createStitches } from '@stitches/react';

import { defaultTheme } from '../../styles/theme';

const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  createTheme,
  theme,
  config: configTheme,
} = createStitches({
  prefix: 'stitches',
  theme: defaultTheme,
  media: {
    sx: '(max-width: 767px)',
    sm: '(max-width: 768px)',
    md: '(max-width: 992px)',
    lg: '(max-width: 1232px)',
  },
});

export {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  createTheme,
  theme,
  configTheme,
};
