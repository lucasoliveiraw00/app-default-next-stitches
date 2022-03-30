import {
  Auxiliary,
  Background,
  Black,
  Gray,
  Green,
  Primary,
  Red,
  White,
  Text,
  Colors,
} from './types';

const black: Black = {
  base: '#000000', // used in everthing everywhere
  light: '#00000099', // 60% used in progressbar, 'conquistas' background
  lighter: '#00000066', // 40% used in input placeholder, progressbar, inactive tab text
  scroll: '#00000033', // used only in custom scrollbar
  disabled: '#353535', // used only in 'disabled' button
};

const white: White = {
  base: '#FFFFFF', // used in texts and backgrounds
  dark: '#FAFAFA', // used in texts of outlined buttons
};

const gray: Gray = {
  base: '#C4C4C4', // used in separators and progressbar
  light: '#E0E0E0', // used as background of disabled inputs
};

const red: Red = {
  base: '#FE3F61', // used in input border error and error text
};

const green: Green = {
  base: '#1DC9A0', // used in positive switch
};

const primary: Primary = {
  white: white.base,
  black: black.base,
};

const auxiliary: Auxiliary = {
  negative: red.base,
  positive: green.base,
};

const background: Background = {
  black: black.base,
  white: white.base,
};

const text: Text = {
  black: black.base,
  white: white.base,
};

const colors: Colors = {
  black: black.base,
  blackLight: black.light,
  blackLighter: black.lighter,
  blackScroll: black.scroll,
  blackDisabled: black.disabled,

  white: white.base,
  whiteDark: white.dark,

  gray: gray.base,
  grayLight: gray.light,

  red: red.base,

  green: green.base,

  primaryWhite: primary.white,
  primaryBlack: primary.white,

  auxiliaryNegative: auxiliary.negative,
  auxiliaryPositive: auxiliary.positive,

  backgroundBlack: background.black,
  backgroundWhite: background.white,

  textBlack: text.black,
  textWhite: text.white,
};

export { colors };
