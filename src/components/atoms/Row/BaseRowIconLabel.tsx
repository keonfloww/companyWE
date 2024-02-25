import {Text} from '@rneui/themed';
import CommonStyles from '@screens/styles';
import {scale} from '@utils/mixins';
import React, {ReactNode, FC} from 'react';
import {TextStyle, View, ViewStyle} from 'react-native';

interface RowIconLabelProps {
  title?: string;
  titleNode?: ReactNode;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  titleStyle?: TextStyle | TextStyle[];
  containerStyle?: ViewStyle;
}
const RowIconLabel: FC<RowIconLabelProps> = ({
  title,
  titleNode = <></>,
  prefixIcon,
  suffixIcon,
  titleStyle = {},
  containerStyle = {},
}) => {
  return (
    <View
      style={[
        {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          ...(prefixIcon && {columnGap: scale(5)}),
        },
        containerStyle,
      ]}>
      {!!prefixIcon && (
        <View
          style={{
            ...(prefixIcon && {minWidth: scale(20), marginRight: scale(5)}),
          }}>
          {!!prefixIcon && prefixIcon}
        </View>
      )}
      {!!title && (
        <Text
          style={[CommonStyles.font.regular14, titleStyle]}
          numberOfLines={1}>
          {title}
        </Text>
      )}
      <View style={{flex: 1}}>{titleNode}</View>
      {!!suffixIcon && suffixIcon}
    </View>
  );
};

export default React.memo(RowIconLabel);
