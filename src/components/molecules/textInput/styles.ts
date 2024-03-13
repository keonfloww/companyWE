import {scale} from '@utils/mixins';
import {StyleSheet} from 'react-native';
import {colors} from 'src/themes';

export default StyleSheet.create({
  input: {
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
    width: '85%',
  },
  touchButton: {
    position: 'absolute',
    right: scale(14),
    justifyContent: 'flex-start',
    width: scale(20),
  },
  iconDropDown: {height: scale(16), width: scale(16)},
  iconShowHide: {height: scale(20), width: scale(20)},
  iconLeft: {height: scale(20), width: scale(20), marginRight: scale(10)},

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
