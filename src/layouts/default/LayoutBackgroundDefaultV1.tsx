import IMAGES from '@assets/images/images';
import React, {FC, PropsWithChildren} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {ImageBackground, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props extends PropsWithChildren {
  containerStyle?: ViewStyle;
}
const LayoutBackgroundDefaultV1: FC<Props> = ({children, containerStyle}) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={IMAGES.bgDefaultSrc}
        resizeMode="cover"
        style={StyleSheet.absoluteFill}>
        {/* TODO: create back icon here */}
      </ImageBackground>
      <View
        style={[
          {marginTop: insets.top, marginBottom: insets.bottom},
          containerStyle,
        ]}>
        {children}
      </View>
    </>
  );
};

export default React.memo(LayoutBackgroundDefaultV1);
