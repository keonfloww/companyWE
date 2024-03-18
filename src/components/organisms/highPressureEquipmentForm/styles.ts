import {scale} from '@utils/mixins';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 1,
    marginHorizontal: scale(12),
    borderColor: '#DBDBDE',
  },
  viewForm: {
    flexDirection: 'row',
    marginHorizontal: scale(12),
    marginVertical: scale(8),
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderColor: '#DBDBDE',
  },
  secondRowContainer: {
    flexDirection: 'row',
  },
  itemText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    width: scale(100),
  },
  itemContainer: {
    width: scale(80),

    justifyContent: 'center',
  },
  checkListText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
  },
  secondRowText: {
    width: scale(100),
  },
  renderItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    marginHorizontal: scale(12),
  },
  resultsContainer: {
    alignItems: 'center',
    padding: 5,
    width: '44%',

    height: scale(40),
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#DBDBDE',
  },
  textRenderItemContainer: {
    borderBottomWidth: 1,
    borderColor: '#DBDBDE',
    height: scale(40),
    justifyContent: 'center',
    borderLeftWidth: 1,
    paddingLeft: scale(12),
  },
  paddingLeft12: {
    paddingLeft: scale(12),
  },
});
