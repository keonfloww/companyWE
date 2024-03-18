import {scale} from '@utils/mixins';
import {StyleSheet} from 'react-native';
import colors from 'react-native-ui-lib/src/style/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    marginTop: scale(16),
  },
  recentInspectionText: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    marginTop: scale(32),
    marginBottom: scale(12),
  },
  renderItemContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(12),
    paddingVertical: scale(16),
    backgroundColor: colors.white,
    marginBottom: scale(4),
  },
  requestDateText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: colors.black,
    marginLeft: scale(16),
  },
  requestDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  flex1: {
    flex: 1,
  },
  requestPlannedDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestDateTextContainer: {
    lineHeight: 20,
    color: colors.black,
  },
  situationText: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    color: colors.black,
    paddingVertical: scale(2),
    paddingHorizontal: scale(8),
  },
  situationTextContainer: {
    marginLeft: scale(16),
    borderRadius: 6,
  },
  termText: {
    color: '#50048A',
  },
  modalText: {
    fontWeight: '400',
    fontSize: 16,
    color: '#0B0B0C',
    alignSelf: 'center',
  },
  modalIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(16),
  },
});
