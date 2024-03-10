import metrics from 'src/themes/metrics';
import {scale} from '@utils/mixins';
import {StyleSheet} from 'react-native';
import {colors} from 'src/themes';

export default StyleSheet.create({
  textError: {
    color: colors.redText,
    marginTop: scale(5),
    fontSize: scale(12),
    fontWeight: 'bold',
  },
  errorView: {
    marginBottom: scale(30),
    marginTop: scale(5),
  },
  viewForm: {
    marginHorizontal: scale(20),
    backgroundColor: colors.white,
    paddingVertical: scale(20),
    borderRadius: 12,
    paddingHorizontal: scale(12),
  },
  touchButton: {
    position: 'absolute',
  },
  iconShowHide: {height: scale(20), width: scale(20)},
  labelText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 24,
    color: '#0B0B0C',
    marginBottom: scale(16),
  },
  titleText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 24,
    color: '#0B0B0C',
    marginBottom: scale(8),
  },
});
