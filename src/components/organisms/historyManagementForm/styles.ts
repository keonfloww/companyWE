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
    marginTop: scale(20),
    borderRadius: 12,
    marginBottom: scale(24),
  },
  touchButton: {
    position: 'absolute',
  },
  iconShowHide: {height: scale(20), width: scale(20)},
  labelText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: '#0B0B0C',
    marginRight: scale(16),
    marginBottom: scale(8),
  },
  titleText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 24,
    color: '#0B0B0C',
    marginBottom: scale(8),
  },
  dropdown: {
    width: scale(150),
    borderRadius: 4,
    alignSelf: 'flex-end',
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  datePicker: {
    width: scale(150),
    borderColor: '#D1D1D1',
    borderWidth: 1,
    borderRadius: 4,
    height: scale(45),
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainer: {flexDirection: 'row', marginBottom: scale(8)},
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    color: '#9E9E9E',
    marginLeft: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    position: 'absolute',
    zIndex: 999,
    borderWidth: 0,
  },
});
