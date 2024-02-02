import IMAGES from '@assets/images/images';
import React, {FC, PropsWithChildren} from 'react';
import {ImageBackground, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const LayoutBackgroundDefault: FC<PropsWithChildren> = ({children}) => {
  const insets = useSafeAreaInsets();
  return (
    <ImageBackground
      source={IMAGES.bgDefaultSrc}
      resizeMode="cover"
      style={{
        flex: 1,
      }}>
      {/* TODO: create back icon here */}
      <View style={{marginTop: insets.top, marginBottom: insets.bottom, height: '100%'}}>
        {children}
      </View>
    </ImageBackground>
  );
};

export default React.memo(LayoutBackgroundDefault);
