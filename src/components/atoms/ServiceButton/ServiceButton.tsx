import IMAGES from '@assets/images/images';
import {scale} from '@utils/mixins';
import {t} from 'i18next';
import React, {memo, useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';

export enum EnumAuthProviderButton {
  APPLE = IMAGES.icAppleSrc,
  YAHOO = IMAGES.icYahooSrc,
  MICROSOFT = IMAGES.icMicrosoftSrc,
  GOOGLE = IMAGES.icGoogleSrc,
}

export enum EnumAuthProviderButtonType {
  SIGN_IN = 'signIn',
  SIGN_UP = 'signUp',
  CONNECT = 'connect',
}

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  title?: string;
  titleStyles?: StyleProp<TextStyle>;
  titleContainerStyles?: StyleProp<ViewStyle>;
  onPress?: () => void;

  authProvider: EnumAuthProviderButton;
  type: EnumAuthProviderButtonType;
}
const ServiceButton: React.FC<Props> = ({
  title = null,
  type,
  containerStyle,
  titleStyles,
  titleContainerStyles,
  onPress,

  authProvider,
}) => {
  const EnumAuthProviderButtonTranslation: {
    [key in EnumAuthProviderButton]: string;
  } = {
    [EnumAuthProviderButton.APPLE]: t('Apple'),
    [EnumAuthProviderButton.YAHOO]: t('Yahoo'),
    [EnumAuthProviderButton.MICROSOFT]: t('Microsoft'),
    [EnumAuthProviderButton.GOOGLE]: t('Google'),
  };

  const EnumAuthProviderButtonTypeTranslation: {
    [key in EnumAuthProviderButtonType]: string;
  } = {
    [EnumAuthProviderButtonType.SIGN_IN]: t('Sign in with'),
    [EnumAuthProviderButtonType.SIGN_UP]: t('Sign up with'),
    [EnumAuthProviderButtonType.CONNECT]: t('Connect'),
  };

  const computedText = useMemo(
    () =>
      `${EnumAuthProviderButtonTypeTranslation?.[type]} ${EnumAuthProviderButtonTranslation?.[authProvider]}`,
    [authProvider, type],
  );

  return (
    <TouchableOpacity onPressOut={onPress}>
      <View style={[styles.container, containerStyle]}>
        <FastImage
          style={[styles.icon, styles.icon]}
          resizeMode={'contain'}
          source={authProvider}
        />
        <View style={[styles.titleContainer, titleContainerStyles]}>
          <Text style={[styles.title, titleStyles]}>
            {title ?? computedText}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ServiceButton);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: scale(38),
    alignItems: 'center',
    borderRadius: scale(5),
    display: 'flex',
    justifyContent: 'center',
    columnGap: scale(15),
  },
  icon: {
    width: scale(20),
    height: scale(20),
  },
  title: {
    color: '#50048A',
  },
  titleContainer: {},
});
