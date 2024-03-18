import {SCREEN_WIDTH} from 'src/themes/mixins';
import {scale} from '@utils/mixins';
import {StyleSheet} from 'react-native';
import {colors} from 'src/themes';

export default StyleSheet.create({
  input: {
    width: (SCREEN_WIDTH - scale(56)) / 3 - scale(10),
    height: scale(40),
    borderColor: '#D1D1D1',
    borderWidth: 1,
    borderRadius: scale(4),
    paddingHorizontal: scale(10),
    color: colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputView: {
    width: '80%',
  },

  iconDropDown: {height: scale(16), width: scale(16)},
  iconShowHide: {height: scale(20), width: scale(20)},
  textRight: {
    color: '#616161',
    fontWeight: '600',
    fontSize: 12,
    position: 'absolute',
    right: scale(-10),

    alignSelf: 'center',
  },

  inputPassword: {
    paddingRight: scale(40),
  },
  labelText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 24,
    color: '#0B0B0C',
    marginBottom: scale(8),
  },
});
