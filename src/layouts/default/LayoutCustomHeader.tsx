import IMAGES from '@assets/images/images';
import SafeView from '@components/atoms/View/SafeView';
import navigationService from '@services/navigationService';
import {scale} from '@utils/mixins';
import React, {FC, PropsWithChildren, ReactNode} from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';

interface Props extends PropsWithChildren {
  customHeader: ReactNode;
  styleCustomHeader?: ViewStyle;
  containerStyle?: ViewStyle;
  isShowBack?: boolean;
}

const LayoutCustomHeader: FC<Props> = ({
  children,
  containerStyle = {},
  customHeader,

  styleCustomHeader = {},
  isShowBack = true,
}) => {
  return (
    <SafeView unSafeBackgroundColor={'white'}>
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
          },
          containerStyle,
        ]}>
        {isShowBack && (
          <TouchableOpacity onPress={navigationService.goBack}>
            <IMAGES.icBack color={'#3C3C3C'} />
          </TouchableOpacity>
        )}
        <View style={[{flex: 1}, styleCustomHeader]}>{customHeader}</View>
      </View>
      {children}
    </SafeView>
  );
};

export default React.memo(LayoutCustomHeader);
