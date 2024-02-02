import ServiceButton, {
  EnumAuthProviderButton,
  EnumAuthProviderButtonType,
} from '@components/atoms/ServiceButton/ServiceButton';
import LayoutBackgroundDefault from '@layouts/default/LayoutBackgroundDefault';
import {Colors} from 'react-native-ui-lib';
import CommonStyles from '@screens/styles';
import useAuthProvider from '@utils/hooks/useAuthProvider';
import {scale} from '@utils/mixins';
import {t} from 'i18next';
import {StyleSheet, Text, View} from 'react-native';
import useConnectMail from './hooks/useConnectMail';

const ConnectMailScreen = () => {
  const {onGoogleLinkButtonPress} = useAuthProvider();
  const {} = useConnectMail({autoRedirectToHome: true});

  return (
    <LayoutBackgroundDefault>
      <View style={{paddingHorizontal: scale(27), marginTop: scale(100)}}>
        <Text style={[CommonStyles.font.bold30, styles.text]}>
          {t('Connect your\nemail accounts')}
        </Text>
        <View style={{height: scale(10)}} />
        <Text style={[CommonStyles.font.regular14, styles.text]}>
          {t(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce libero leo, tincidunt eu ullamcorper euismod, blandit a ipsum.',
          )}
        </Text>
        <View style={{height: scale(15)}} />
        <View style={{flex: 1}}>
          <ServiceButton
            title={t('Connect a Google Account')}
            type={EnumAuthProviderButtonType.CONNECT}
            containerStyle={styles.baseButton}
            authProvider={EnumAuthProviderButton.GOOGLE}
            titleStyles={[CommonStyles.font.regular14,styles.connectText]}
            onPress={onGoogleLinkButtonPress}
          />
        </View>
      </View>
    </LayoutBackgroundDefault>
  );
};

const styles = StyleSheet.create({
  connectText: {
    color: '#50048A',
    fontWeight: '400',
  },
  text: {
    color: '#3c3c3c',
  },
  baseButton: {
    backgroundColor: 'white',
    height: scale(40),
    paddingVertical: 0,
    marginTop: scale(15),
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#50048A',
  },
});

export default ConnectMailScreen;
