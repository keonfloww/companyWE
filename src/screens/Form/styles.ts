import {StyleSheet} from 'react-native';
import {colors} from '../../themes';
import {scale} from '@utils/mixins';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.underlayColor,
  },
  webview: {
    flex: 1,
    backgroundColor: colors.white,
  },

  tabBarContainer: {
    flex: 1,
    marginHorizontal: scale(20),
    marginTop: scale(24),
    backgroundColor: colors.white,
    borderRadius: 12,
  },

  label: {
    color: colors.white,
    margin: scale(20),
    marginLeft: 0,
  },
  button: {
    marginTop: scale(40),
    color: colors.white,
    height: scale(40),
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },

  input: {
    backgroundColor: 'white',
    borderColor: 'none',
    height: scale(40),
    padding: 10,
    borderRadius: 4,
  },
  viewForm: {
    marginHorizontal: scale(20),
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  collapsibleContainer: {
    flexDirection: 'row',
    marginVertical: scale(16),
    alignItems: 'center',
    paddingHorizontal: scale(12),
    justifyContent: 'space-between',
  },
  flexRow: {flexDirection: 'row', alignItems: 'center'},
});
