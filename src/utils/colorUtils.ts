export enum EnumProfileColors {
  DEFAULT,
}
export interface ColorFromChar {
  MainColor: string;
  SecondaryColor: string;
}
export const ProfileColors: {
  [key in string | EnumProfileColors]: ColorFromChar;
} = {
  [EnumProfileColors.DEFAULT]: {
    MainColor: '#21bfbf',
    SecondaryColor: '#c5fafa',
  },
  A: {MainColor: '#21bfbf', SecondaryColor: '#c5fafa'},
  B: {MainColor: 'Blue', SecondaryColor: '#B0C4DE'},
  C: {MainColor: '#0aa6a6', SecondaryColor: '#a4f5f5'},
  D: {MainColor: 'Deep Purple', SecondaryColor: '#D8BFD8'},
  E: {MainColor: 'Emerald Green', SecondaryColor: '#80FFA0'},
  F: {MainColor: 'Fuchsia', SecondaryColor: '#FFD9EC'},
  G: {MainColor: '#d1d15c', SecondaryColor: '#f0f0bd'},
  H: {MainColor: 'Honey', SecondaryColor: '#FFFFCC'},
  I: {MainColor: 'Indigo', SecondaryColor: '#8A2BE2'},
  J: {MainColor: 'Jade', SecondaryColor: '#66FFC2'},
  K: {MainColor: 'Khaki', SecondaryColor: '#F5F5DC'},
  L: {MainColor: 'Lavender', SecondaryColor: '#E6E6FA'},
  M: {MainColor: '#ba16ba', SecondaryColor: '#fa96fa'},
  N: {MainColor: 'Navy Blue', SecondaryColor: '#00008B'},
  O: {MainColor: '#eb872f', SecondaryColor: '#ffd5b0'},
  P: {MainColor: 'Pink', SecondaryColor: '#FFCCCC'},
  Q: {MainColor: 'Quartz', SecondaryColor: '#FFFFFF'},
  R: {MainColor: 'Red', SecondaryColor: '#FF4040'},
  S: {MainColor: 'Sapphire Blue', SecondaryColor: '#6495ED'},
  T: {MainColor: '#25ba37', SecondaryColor: '#77e684'},
  U: {MainColor: 'Ultramarine', SecondaryColor: '#4169E1'},
  V: {MainColor: '#cc4bcc', SecondaryColor: '#D8BFD8'},
  W: {MainColor: 'White', SecondaryColor: '#F5F5F5'},
  X: {MainColor: 'Xanadu', SecondaryColor: '#B0BEC5'},
  Y: {MainColor: 'Yellow', SecondaryColor: '#FFFF99'},
  Z: {MainColor: '#41d1d1', SecondaryColor: '#E0FFFF'},
};

const getColorFromChar = (
  string?: string,
): {MainColor: string; SecondaryColor: string} => {
  const char = string?.[0]?.toUpperCase() ?? '';

  const colorDefaullt = ProfileColors[EnumProfileColors.DEFAULT];
  if (!char) {
    return colorDefaullt;
  }
  if (!ProfileColors?.[char]) {
    console.warn(`${char} is not found in color config`);
  }
  return ProfileColors?.[char] ?? colorDefaullt;
};
export const ColorUtils = {
  getColorFromChar,
};
