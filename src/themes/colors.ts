/**
 * Base Colors
 *
 * Text Colors
 * - Suffix 'Text'
 *
 * Others
 */

const colors = {
  // BaseColors
  primary: '#57937D',
  secondary: '#273047',
  danger: '#FF0000',
  pink: '#ED64A6',
  blue: '#2307FF',
  warning: '#FFA813',
  white: '#FFF',
  black: '#000000',
  red: '#ff0000',
  greenBackground: '#cbe9a2',
  // TextColors
  blackText: '#1A202C',
  whiteText: '#FFFFFF',
  grayText: '#707070',
  darkGrayText: '#575757',
  redText: '#ff6060',

  // Others
  borderGray: '#BEBEBE',
  bgGray: '#F4F4F4',
  bgInput: '#F1F1F2',
  line: '#3ED160',
  windowTint: 'rgba(0, 0, 0, 0.4)',
  blueButton: '#EDF2F7',
  divider: '#DBDBDE',
  inactiveIcon: '#718096',
  liked: '#ED8E64',
  placeholder: '#C7C7CD',
  searchTagResultListBorder: '#A3A3A3',
  switchTrackFalse: '#767577',
  actionSheetText: '#007AFF',
  underlayColor: '#f7f7f7',
  bgActionSheet: '#E4E4E4',
  bookmark: 'rgba(0, 0, 0, 0.8)',
  //border color
  borderButton: '#707070',
  tagBorder: '#EEEEEE',

  //hyper link
  hyperLink: '#2980b9',

  containTitle: '#4A65BE',
  tutorialLastPageHightLight: '#EA9472',
  backgroundBorder: '#F0F0F0',
  appColor: '#EC6531',
  textAppColor: '#616161',
};

export const hexToRGBA = (hexCode: string, opacity: number) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex += hex;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
};

export default colors;
