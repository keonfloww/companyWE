import {scale} from '@utils/mixins';
import * as React from 'react';
import {
  ImageRequireSource,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import FastImage, {ResizeMode, Source} from 'react-native-fast-image';

interface AvatarProps {
  source: Source | ImageRequireSource;
  containerStyle?: StyleProp<ViewStyle>;
  size?: number;
  resizeMode?: ResizeMode;
  setLoading?: (val: boolean) => void;
}

const Avatar: React.FC<AvatarProps> = ({
  size = scale(57),
  source,
  containerStyle,
  resizeMode,
  setLoading,
}) => {
  return (
    <View style={[styles(size).container, containerStyle]}>
      <FastImage
        source={source}
        style={source ? styles(size).image : styles(size).icon}
        resizeMode={resizeMode ? resizeMode : FastImage.resizeMode.cover}
        onLoad={(e)=> setLoading ? setLoading(false) : {}}
      />
    </View>
  );
};

const styles = (size: number) =>
  StyleSheet.create({
    container: {
      // backgroundColor: colors.white,
      backgroundColor: 'lightgray',
      justifyContent: 'center',
      alignItems: 'center',
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: 'hidden',
    },
    image: {
      width: size,
      height: size,
    },
    icon: {
      width: size / 3,
      height: size / 3,
      tintColor: 'gray',
    },
  });

export default React.memo(Avatar);
