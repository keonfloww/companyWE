import ServiceButton, {
  EnumAuthProviderButton,
  EnumAuthProviderButtonType,
} from '@components/atoms/ServiceButton/ServiceButton';
import CommonStyles from '@screens/styles';
import useAuthProvider from '@utils/hooks/useAuthProvider';
import {scale} from '@utils/mixins';
import {t} from 'i18next';
import {StyleSheet, Text, View} from 'react-native';
import useConnectMail from './hooks/useConnectMail';
import LayoutBackgroundDefaultV1 from '@layouts/default/LayoutBackgroundDefaultV1';
import LogoutButton from '@components/atoms/LogoutButton';
import useAuth from '@screens/Auth/hooks/useAuth';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ConnectMailScreen = () => {
  const insets = useSafeAreaInsets();

  const {onGoogleLinkButtonPress} = useAuthProvider();
  const {handleSignOut} = useAuth();
  const {} = useConnectMail({autoRedirectToHome: true});

  return (
    <LayoutBackgroundDefaultV1
      containerStyle={{
        marginHorizontal: scale(25),
        flex: 1,
      }}>
      <View style={{paddingTop: scale(100), flex: 1}}>
        <View style={{position: 'absolute', right: 0, top: insets.top}}>
          <LogoutButton onPress={handleSignOut} />
        </View>
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
            titleStyles={[CommonStyles.font.regular14, styles.connectText]}
            onPress={onGoogleLinkButtonPress}
          />
        </View>
      </View>
    </LayoutBackgroundDefaultV1>
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
