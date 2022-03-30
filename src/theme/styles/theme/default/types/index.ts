import { ConfigType } from '@stitches/react/types/config';
import { Colors } from '../colors/types';
import { Fonts, FontSizes, FontWeights, LineHeights } from '../fonts/types';

export type DefaultTheme = ConfigType.Theme<{
  colors: Colors;
  space: undefined;
  fontSizes: FontSizes;
  fonts: Fonts;
  fontWeights: FontWeights;
  lineHeights: LineHeights;
  letterSpacings: undefined;
  sizes: undefined;
  borderWidths: undefined;
  borderStyles: undefined;
  radii: undefined;
  shadows: undefined;
  zIndices: undefined;
  transitions: undefined;
}>;
