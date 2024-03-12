import metrics from 'src/themes/metrics';
import {scale} from '@utils/mixins';
import {StyleSheet} from 'react-native';
import {colors} from 'src/themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: scale(12),
    marginBottom: scale(12),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  addSquareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addSquareText: {
    marginRight: scale(15),
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  renderItemSeparatorContainer: {
    flexDirection: 'row',
  },
  titleContainer: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: '#FFF4F1',
    height: scale(40),
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#E3E3E3',
    borderTopWidth: 1,
  },
  resultContainer: {
    width: '50%',
    alignItems: 'center',
    height: scale(40),
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#E3E3E3',
    borderTopWidth: 1,
  },
});
