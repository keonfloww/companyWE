import IMAGES from '@assets/images/images';
import CommonStyles from '@screens/styles';
import {scale} from '@utils/mixins';
import {View, Text} from 'react-native';

const SearchHistoryEmpty = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: scale(5),
      }}>
      <IMAGES.icSearch color={'#8F8F8F'} {...CommonStyles.icon.icon20} />
      <Text style={[CommonStyles.font.bold16, {color: '#3C3C3C'}]}>
        No result found
      </Text>
      <Text style={[CommonStyles.font.regular12, {color: '#3C3C3C'}]}>
        Type to start a search
      </Text>
    </View>
  );
};

export default SearchHistoryEmpty;
