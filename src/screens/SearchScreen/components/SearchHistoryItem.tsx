import IMAGES from '@assets/images/images';
import BaseRowIconLabel from '@components/atoms/Row/BaseRowIconLabel';
import CommonStyles from '@screens/styles';
import {scale} from '@utils/mixins';
import React, {FC} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Colors} from 'react-native-ui-lib';

interface Props {
  content: string;
  onRemoveSingleHistory: () => void;
  onPress: () => void;
}

const SearchHistoryItem: FC<Props> = ({
  content,
  onRemoveSingleHistory = () => {},
  onPress = () => {},
}) => {
  return (
    <BaseRowIconLabel
      containerStyle={{
        justifyContent: 'space-between',
        marginRight: scale(20),
        columnGap: scale(10),
      }}
      titleStyle={{
        color: Colors.text,
      }}
      titleNode={
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          <Text numberOfLines={1} style={CommonStyles.font.semiBold14}>
            {content}
          </Text>
        </TouchableOpacity>
      }
      suffixIcon={
        <TouchableOpacity activeOpacity={0.7} onPress={onRemoveSingleHistory}>
          <IMAGES.icClose {...CommonStyles.icon.icon12} color={'#3C3C3C'} />
        </TouchableOpacity>
      }
    />
  );
};

export default React.memo(SearchHistoryItem);
