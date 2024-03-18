import {scale} from '@utils/mixins';
import {StyleSheet} from 'react-native';
import colors from 'react-native-ui-lib/src/style/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {alignSelf: 'center', marginVertical: scale(60)},
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
  },
  viewContainer: {
    paddingHorizontal: scale(20),
  },
  headerContainer: {
    paddingHorizontal: scale(20),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bodyContainer: {flex: 2, paddingHorizontal: scale(20), marginTop: scale(40)},
  searchInput: {
    backgroundColor: colors.white,
    borderWidth: 0,
    borderColor: colors.white,
    borderRadius: 8,
  },
  searchInputContainer: {
    marginBottom: scale(24),
  },
  listCompanyContainer: {
    borderRadius: 12,
    backgroundColor: colors.white,
    paddingHorizontal: scale(8),
  },
  renderItemContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    alignItems: 'center',
  },
  titleText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: colors.black,
  },
  bodyText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    color: colors.black,
  },
});
