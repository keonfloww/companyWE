import IMAGES from '@assets/images/images';
import CommonStyles from '@screens/styles';
import { scale } from '@utils/mixins';
import { FC } from 'react';
import { View, Text } from 'react-native';

interface Props {
  isSearched?: boolean
}
const SearchHistoryEmpty: FC<Props> = ({ isSearched = false }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: scale(5),
      }}>
      <IMAGES.icSearch color={'#8F8F8F'} {...CommonStyles.icon.icon20} />
      <Text style={[CommonStyles.font.bold16, { color: '#3C3C3C' }]}>
        {isSearched ? 'No result found' : 'No active search'}
      </Text>
      {!isSearched && <Text style={[CommonStyles.font.regular12, { color: '#3C3C3C' }]}>
        Type to start a search
      </Text>}
    </View>
  );
};

export default SearchHistoryEmpty;
