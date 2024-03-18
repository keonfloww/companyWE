import {scale} from '@utils/mixins';
import {StyleSheet} from 'react-native';
import colors from 'react-native-ui-lib/src/style/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    paddingHorizontal: scale(20),
  },
  calendar: {
    marginBottom: 10,
  },
  calendarContainer: {
    borderBottomLeftRadius: 12,
    overflow: 'hidden',
    borderBottomRightRadius: 12,
  },
  customTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  customTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00BBF2',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    color: '#110218',
    marginVertical: scale(24),
  },
  calendarInformationContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    padding: scale(12),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  calendarInformationText: {
    color: '#0B0B0C',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  inspectionStatusContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  numberText: {
    color: '#0B0B0C',
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 16,
  },
  numberContainer: {
    borderRadius: 4,
    width: scale(20),
    height: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(4),
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
  listViewContainer: {
    paddingHorizontal: scale(20),
    marginTop: scale(24),
    marginBottom: scale(24),
  },
  listContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingHorizontal: scale(12),
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: scale(8),
  },
  noText: {
    flex: 1,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
  },
  renderItemContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderBottomColor: '#F3F3F4',
    borderBottomWidth: 1,
  },
  bodyListText: {flex: 1, fontWeight: '400', fontSize: 14, lineHeight: 24},
  numberListText: {flex: 0, width: scale(50)},
});
