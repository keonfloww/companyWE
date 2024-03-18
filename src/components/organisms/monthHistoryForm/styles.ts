import {scale} from '@utils/mixins';
import {StyleSheet} from 'react-native';
import {colors} from 'src/themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: scale(24),
    marginHorizontal: scale(20),
    padding: scale(12),
    borderRadius: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  titleText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
  },
  viewParam: {
    paddingVertical: scale(8),
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: scale(8),
    borderColor: '#E0E0E0',
    marginTop: scale(8),
    flexDirection: 'row',
  },
  width40: {width: '40%'},
  blackLine: {
    width: '30%',
    height: 1,
    backgroundColor: 'black',
    alignSelf: 'center',
    marginTop: scale(25),
  },
  blackLineContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  imageContainer: {marginTop: scale(5)},
  width100: {width: scale(100)},
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    color: '#616161',
    marginHorizontal: scale(12),
    marginTop: scale(10),
  },
  kwhContainer: {marginLeft: scale(12), width: scale(100)},
  xText: {
    color: '#616161',
    paddingHorizontal: scale(20),
  },
  drainageContainer: {
    width: scale(100),
  },
  textRight: {marginLeft: scale(30)},
  height16: {height: scale(16)},
});
