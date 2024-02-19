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
  B: {MainColor: '#0000FF', SecondaryColor: '#B0C4DE'},
  C: {MainColor: '#0aa6a6', SecondaryColor: '#a4f5f5'},
  D: {MainColor: '#36013f', SecondaryColor: '#D8BFD8'},
  E: {MainColor: '#004d24', SecondaryColor: '#80FFA0'},
  F: {MainColor: '#FF00FF', SecondaryColor: '#FFD9EC'},
  G: {MainColor: '#d1d15c', SecondaryColor: '#f0f0bd'},
  H: {MainColor: '#f9c901', SecondaryColor: '#FFFFCC'},
  I: {MainColor: '#4b0082', SecondaryColor: '#8A2BE2'},
  J: {MainColor: '#00a86b', SecondaryColor: '#66FFC2'},
  K: {MainColor: '#c3b091', SecondaryColor: '#F5F5DC'},
  L: {MainColor: '#A4A4B4', SecondaryColor: '#E6E6FA'},
  M: {MainColor: '#ba16ba', SecondaryColor: '#fa96fa'},
  N: {MainColor: '#898989', SecondaryColor: '#00008B'},
  O: {MainColor: '#eb872f', SecondaryColor: '#ffd5b0'},
  P: {MainColor: '#ffc0cb', SecondaryColor: '#FFCCCC'},
  Q: {MainColor: '#51414F', SecondaryColor: '#FFFFFF'},
  R: {MainColor: '#F00', SecondaryColor: '#FF4040'},
  S: {MainColor: '#0F52BA', SecondaryColor: '#6495ED'},
  T: {MainColor: '#25ba37', SecondaryColor: '#77e684'},
  U: {MainColor: '#0437F2', SecondaryColor: '#4169E1'},
  V: {MainColor: '#cc4bcc', SecondaryColor: '#D8BFD8'},
  W: {MainColor: '##FFF', SecondaryColor: '#F5F5F5'},
  X: {MainColor: '#738678', SecondaryColor: '#B0BEC5'},
  Y: {MainColor: '#FFFF00', SecondaryColor: '#FFFF99'},
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
