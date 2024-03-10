import {StyleSheet} from 'react-native';
import {colors} from '../../themes';
import {scale} from '@utils/mixins';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.underlayColor,
  },
  scrollViewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flexContainer: {
    flex: 1,
  },
  tabBarContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#b43757',
  },

  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },

  input: {
    backgroundColor: 'white',
    borderColor: 'none',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  viewForm: {
    marginHorizontal: scale(20),
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  tabViewContainer: {
    paddingHorizontal: scale(32),
    width: '100%',
    backgroundColor: 'red',
  },
  tabBarStyle: {
    backgroundColor: colors.white,
    borderRadius: 24,
  },
  tabBarLabel: {
    color: '#616161',
  },
  tabStyle: {
    marginHorizontal: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 24,
  },
});
