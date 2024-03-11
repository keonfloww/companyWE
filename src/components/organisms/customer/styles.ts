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

  viewParam: {
    paddingVertical: scale(8),
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: scale(8),
    borderColor: '#E0E0E0',
    marginTop: scale(8),
    flexDirection: 'row',
  },
  titleText: {
    fontWeight: '600',
    fontSize: 14,
  },
  paramText: {fontWeight: '400', fontSize: 14, color: '#707070'},
  inspectorText: {fontWeight: '600', fontSize: 14, marginTop: scale(12)},
});
