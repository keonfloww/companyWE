import metrics from '@themes/metrics';
import {scale, scaleFont} from '@utils/mixins';
import {StyleSheet} from 'react-native';
import {colors} from 'src/themes';
export default StyleSheet.create({
  textInputContainer: {
    marginBottom: scale(20),
  },
  label: {
    flexDirection: 'row',
  },
  textError: {
    color: colors.red,
    fontSize: scale(11),
    marginTop: scale(5),
  },
  labelText: {
    fontWeight: 'bold',
    marginBottom: scale(12),
    color: colors.black,
    fontSize: scaleFont(16),
  },
});
