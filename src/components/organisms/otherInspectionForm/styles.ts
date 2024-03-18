import metrics from 'src/themes/metrics';
import {scale} from '@utils/mixins';
import {StyleSheet} from 'react-native';
import {colors} from 'src/themes';

export default StyleSheet.create({
  container: {
    marginHorizontal: scale(12),
    marginBottom: scale(12),
  },
  titleText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    marginTop: scale(20),
  },
  marginText: {
    marginTop: scale(12),
  },
});
