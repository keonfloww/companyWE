import {scale} from '@utils/mixins';
import {StyleSheet} from 'react-native';

const ViewStyles = StyleSheet.create({
  viewLayout: {
    marginVertical: scale(10),
    marginHorizontal: scale(25),
  },
});
const SpaceStyles = StyleSheet.create({
  s5: {width: scale(5), height: scale(5)},
  s10: {width: scale(10), height: scale(10)},
  s25: {width: scale(25), height: scale(25)},
  w10: {width: scale(10)},
  h10: {width: scale(10)},
  dividerVertical: {
    marginVertical: scale(10),
  },
});

const FontSizeStyles = {
  size10: scale(10),
  size12: scale(12),
  size14: scale(14),
  size16: scale(16),
  size24: scale(24),
  size26: scale(26),
  size30: scale(30),
};

const FontFamilyStyles = {
  regular: 'Gilroy-Regular',
  medium: 'Gilroy-Medium',
  semiBold: 'Gilroy-SemiBold',
  bold: 'Gilroy-Bold',
};

const FontStyles = StyleSheet.create({
  defaultText: {
    fontSize: FontSizeStyles.size10,
    fontFamily: FontFamilyStyles.regular,
  },
  regular10: {
    fontSize: FontSizeStyles.size10,
    fontFamily: FontFamilyStyles.regular,
  },
  regular12: {
    fontSize: FontSizeStyles.size12,
    fontFamily: FontFamilyStyles.regular,
  },
  regular14: {
    fontSize: FontSizeStyles.size14,
    fontFamily: FontFamilyStyles.regular,
  },
  semiBold12: {
    fontSize: FontSizeStyles.size12,
    fontFamily: FontFamilyStyles.semiBold,
  },
  semiBold14: {
    fontSize: FontSizeStyles.size14,
    fontFamily: FontFamilyStyles.semiBold,
  },
  semiBold16: {
    fontSize: FontSizeStyles.size16,
    fontFamily: FontFamilyStyles.semiBold,
  },
  bold16: {
    fontSize: FontSizeStyles.size16,
    fontFamily: FontFamilyStyles.bold,
  },
  bold24: {
    fontSize: FontSizeStyles.size24,
    fontFamily: FontFamilyStyles.bold,
  },
  bold26: {
    fontSize: FontSizeStyles.size26,
    fontFamily: FontFamilyStyles.bold,
  },
  bold30: {
    fontSize: FontSizeStyles.size30,
    fontFamily: FontFamilyStyles.bold,
  },

  buttonText14: {
    fontSize: FontSizeStyles.size14,
    fontFamily: FontFamilyStyles.regular,
  },
});
const IconStyles = StyleSheet.create({
  icon15: {
    width: scale(15),
    height: scale(15),
  },
  icon35: {
    width: scale(35),
    height: scale(35),
  },
});
const FlexStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  col: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
});

const CommonStyles = {
  view: ViewStyles,
  space: SpaceStyles,
  font: FontStyles,
  fontSize: FontSizeStyles,
  icon: IconStyles,
  fontFamily: FontFamilyStyles,
  flex: FlexStyles,
};

export default CommonStyles;
