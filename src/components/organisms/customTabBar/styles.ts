import metrics from 'src/themes/metrics';
import {scale} from '@utils/mixins';
import {StyleSheet} from 'react-native';
import {colors} from 'src/themes';

export default StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 12,
    marginHorizontal: 5,
    marginBottom: 20,
    paddingVertical: 4,
    borderRadius: 24,
    marginTop: 12,
  },
  container: {
    flexDirection: 'row',
  },
});
