import CommonStyles from '@screens/styles';
import {ColorUtils} from '@utils/colorUtils';
import useColors from '@utils/hooks/useColors';
import {scale} from '@utils/mixins';
import {safeString} from '@utils/stringUtils';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native-ui-lib';

interface Props {
  name: string;
  width?: number;
  height?: number;
}
const AvatarMailSender: FC<Props> = ({
  name = '',
  width = scale(36),
  height = scale(36),
}) => {
  const _styles = useColors(styles);

  return (
    <View
      style={[
        _styles.logoContainer,

        {
          backgroundColor: ColorUtils.getColorFromChar(name).SecondaryColor,
          width,
          height,
        },
      ]}>
      <Text
        style={[
          _styles.logoText,
          {
            color: ColorUtils.getColorFromChar(name).MainColor,
          },
        ]}>
        {safeString(name)?.[0]}
      </Text>
    </View>
  );
};

export default React.memo(AvatarMailSender);

const styles = StyleSheet.create({
  logoContainer: {
    borderRadius: scale(36),
    borderColor: Colors.borderAvatar,
    borderWidth: scale(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    ...CommonStyles.font.semiBold16,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: scale(2),
    paddingLeft: scale(0.5),
  },
});
