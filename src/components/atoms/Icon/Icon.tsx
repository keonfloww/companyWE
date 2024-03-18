import React, {memo} from 'react';
import {Image, ImageProps, ImageStyle, StyleSheet} from 'react-native';

import {scale} from 'src/themes/mixins';

interface IconProps extends ImageProps {
  width?: number;
  height?: number;
  style?: ImageStyle;
  color?: string;
}

const Icon: React.FC<IconProps> = ({
  width = scale(24),
  height = scale(24),
  color,
  style,
  ...props
}) => {
  return (
    <Image
      style={{...styles.icon, width, height, tintColor: color, ...style}}
      resizeMode={'contain'}
      {...props}
    />
  );
};

export default memo(Icon);

const styles = StyleSheet.create({
  icon: {},
});
