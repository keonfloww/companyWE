import {Text} from '@rneui/themed';
import CommonStyles from '@screens/styles';
import {scale} from '@utils/mixins';
import React, {ReactNode, FC} from 'react';
import {TextStyle, View} from 'react-native';

interface RowIconLabelProps {
  title?: string;
  titleNode?: ReactNode;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  titleStyle?: TextStyle | TextStyle[];
}
const RowIconLabel: FC<RowIconLabelProps> = ({
  title,
  titleNode = <></>,
  prefixIcon,
  suffixIcon,
  titleStyle = {},
}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...(prefixIcon && {columnGap: scale(5)}),
      }}>
      <View
        style={{
          ...(prefixIcon && {minWidth: scale(20), marginRight: scale(5)}),
        }}>
        {!!prefixIcon && prefixIcon}
      </View>
      <Text style={[CommonStyles.font.regular14, titleStyle]} numberOfLines={1}>
        {title}
      </Text>
      {titleNode}
      {!!suffixIcon && suffixIcon}
    </View>
  );
};

export default React.memo(RowIconLabel);
