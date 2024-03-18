import IMAGES from '@assets/images/images';
import SafeView from '@components/atoms/View/SafeView';
import navigationService from '@services/navigationService';
import {scale} from '@utils/mixins';
import React, {FC, PropsWithChildren, ReactNode} from 'react';
import {Platform, TouchableOpacity, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props extends PropsWithChildren {
  customHeader: ReactNode;
  styleCustomHeader?: ViewStyle;
  containerStyle?: ViewStyle;
  isShowBack?: boolean;
  darkTheme: boolean;
}

const LayoutCustomHeader: FC<Props> = ({
  children,
  containerStyle = {},
  customHeader,

  styleCustomHeader = {},
  isShowBack = true,
  darkTheme = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeView unSafeBackgroundColor={darkTheme ? '#50048A' : 'white'}>
      <View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingHorizontal: scale(15),
            flexDirection: 'row',
            columnGap: scale(15),
            borderBottomColor: '#DADADA',
            borderBottomWidth: scale(1),
            paddingBottom: scale(10),
            backgroundColor: darkTheme ? '#50048A' : 'white',
            ...(Platform.OS == 'android' && {
              paddingTop: insets.top + scale(10),
            }),
          },
          containerStyle,
        ]}>
        {isShowBack && (
          <TouchableOpacity onPress={navigationService.goBack}>
            <IMAGES.icBack color={darkTheme ? 'white' : '#3C3C3C'} />
          </TouchableOpacity>
        )}
        <View style={[{flex: 1}, styleCustomHeader]}>{customHeader}</View>
      </View>
      {children}
    </SafeView>
  );
};

export default React.memo(LayoutCustomHeader);
