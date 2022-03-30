import { Fonts, FontSizes, FontWeights, LineHeights } from './types';

const fonts: Fonts = {
  defaultRegular: 'Raleway-Regular',
  defaultMedium: 'Raleway-Medium',
  defaultBold: 'Raleway-Bold',
};

const fontWeights: FontWeights = {
  defaultRegular: 400,
  defaultMedium: 500,
  defaultBold: 700,
};

const fontSizes: FontSizes = {
  sm: 1.2, // 12px
  base: 1.6, // 16px
  lg: 2.0, // 20px
  xl: 2.4, // 24px
  '2xl': 3.0, // 30px
  '3xl': 3.4, // 34px
};

const lineHeights: LineHeights = {
  sm: 1.4, // 14px
  base: 1.9, // 19px
  lg: 2.3, // 23px
  xl: 2.8, // 28px
  '2xl': 3.5, // 35px
  '3xl': 4.0, // 40px
};

export { fonts, fontWeights, fontSizes, lineHeights };
