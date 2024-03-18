import {colors} from 'src/themes';
import {scale} from '@utils/mixins';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  textHeader: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    color: '#0B0B0C',
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginLeft8: {marginLeft: scale(8)},
  bodyContainer: {
    paddingHorizontal: scale(20),
    marginTop: scale(24),
  },
  cardContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: scale(12),
    paddingVertical: scale(16),
    borderRadius: 12,
  },
  viewCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleCardText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#5B5B5F',
  },
  dataCardText: {
    marginTop: scale(8),
    color: '#0B0B0C',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  headerCardText: {
    color: '#0B0B0C',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  dividerContainer: {
    marginVertical: scale(30),
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    marginLeft: scale(12),
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 16,
    color: '#5B5B5F',
  },
  notificationView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(18),
  },
  userManualText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: colors.appColor,
  },
  versionText: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#5B5B5F',
  },
  signOutText: {
    color: '#F11F11',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginLeft: scale(12),
  },
});
