import {SCREEN_HEIGHT} from 'src/themes/mixins';
import {scale} from '@utils/mixins';
import {StyleSheet} from 'react-native';
import colors from 'react-native-ui-lib/src/style/colors';

export default StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT / 2.5,
  },
  fastImageContainer: {
    height: SCREEN_HEIGHT / 2.5,
  },
  imageBackgroundContainer: {
    flex: 1,
    borderBottomLeftRadius: 12,
    overflow: 'hidden',
    borderBottomRightRadius: 12,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    color: colors.white,
    marginTop: 16,
  },
  viewContainer: {
    paddingHorizontal: scale(20),
  },
  headerContainer: {
    paddingHorizontal: scale(20),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconNotiContainer: {
    marginTop: scale(10),
  },
  userContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
    marginTop: scale(24),
    alignItems: 'center',
  },
  userNameText: {
    color: colors.white,
    fontSize: scale(16),
    fontWeight: '600',
    lineHeight: 24,
  },
  userImage: {
    width: scale(44),
    height: scale(44),
    borderRadius: 6,
    marginRight: scale(12),
  },
  cardContainer: {
    padding: scale(12),
    borderRadius: 12,
  },
  cardViewContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
    marginTop: scale(24),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dataText: {
    color: '#2F140A',
    fontSize: scale(18),
    fontWeight: '600',
    lineHeight: 24,
    marginLeft: scale(4),
    marginTop: scale(32),
  },
  titleText: {
    fontSize: scale(14),
    fontWeight: '400',
    lineHeight: 24,
    color: '#2F140A',
  },
  titleTextContainer: {flexDirection: 'row', marginTop: 4},
});
