import {SCREEN_WIDTH} from 'src/themes/mixins';
import {scale} from '@utils/mixins';
import {StyleSheet} from 'react-native';
import {colors} from 'src/themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: scale(24),
    marginHorizontal: scale(12),
    padding: scale(12),
  },

  viewParam: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: scale(12),
  },
  paramText: {fontWeight: '400', fontSize: 14, color: '#707070'},
  inspectorText: {fontWeight: '600', fontSize: 14, marginTop: scale(12)},
  imageContainer: {
    height: scale(124),
    width: SCREEN_WIDTH / 2 - scale(40),
    borderRadius: 12,
  },
});
