import CommonStyles from '@screens/styles';
import {scale} from '@utils/mixins';
import React, {FC} from 'react';
import {View, Text} from 'react-native';

const SearchHistoryHeader: FC<any> = ({title = ''}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        width: '100%',
        justifyContent: 'flex-start',
        marginBottom: scale(10),
      }}>
      <Text style={[CommonStyles.font.bold14, {textAlign: 'left'}]}>
        {title}
      </Text>
    </View>
  );
};

export default React.memo(SearchHistoryHeader);
