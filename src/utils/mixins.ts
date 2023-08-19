/** This mixin help us scale UX base on the device's size */
import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
// Based on iPhone XS's scale
const widthScale = SCREEN_WIDTH / 375;
const heightScale = SCREEN_HEIGHT / 812;

export const scale = (size: number) => size * widthScale;

export const scaleHeight = (size: number) => size * heightScale;

export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const scaleFont = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
