export type Black = {
  /**
   * @string `#000000` - used in everthing everywhere
   */
  base: string;
  /**
   * @string `#00000099` - 60% used in progressbar, 'conquistas' background
   */
  light: string;
  /**
   * @string `#00000066` - 40% used in input placeholder, progressbar, inactive tab text
   */
  lighter: string;
  /**
   * @string `#00000033` - used only in custom scrollbar
   */
  scroll: string;
  /**
   * @string `#353535` - used only in 'disabled' button
   */
  disabled: string;
};

export type White = {
  /**
   * @string `#FFFFFF` - used in texts and backgrounds
   */
  base: string;
  /**
   * @string `#FAFAFA` - used in texts of outlined buttons
   */
  dark: string;
};

export type Gray = {
  /**
   * @string `#C4C4C4` - used in separators and progressbar
   */
  base: string;
  /**
   * @string `#E0E0E0` - used as background of disabled inputs
   */
  light: string;
};

export type Red = {
  /**
   * @string  '#FE3F61' - used in input border error and error text
   */
  base: string;
};

export type Green = {
  /**
   * @string `#1DC9A0` - used in positive switch
   */
  base: string;
};

export type Auxiliary = {
  /**
   * @String `#FE3F61`
   */
  negative: string;
  /**
   * @String `#1DC9A0`
   */
  positive: string;
};

export type Primary = {
  /**
   * @String `#000000`
   */
  black: string;
  /**
   * @String `#FFFFFF`
   */
  white: string;
};

export type Background = {
  /**
   * @String `#000000`
   */
  black: string;
  /**
   * @String `#FFFFFF`
   */
  white: string;
};

export type Text = {
  /**
   * @String `#000000`
   */
  black: string;
  /**
   * @String `#FFFFFF`
   */
  white: string;
};

export type Colors = {
  black: string;
  blackLight: string;
  blackLighter: string;
  blackScroll: string;
  blackDisabled: string;
  white: string;
  whiteDark: string;
  gray: string;
  grayLight: string;
  red: string;
  green: string;
  primaryWhite: string;
  primaryBlack: string;
  auxiliaryNegative: string;
  auxiliaryPositive: string;
  backgroundBlack: string;
  backgroundWhite: string;
  textBlack: string;
  textWhite: string;
};
