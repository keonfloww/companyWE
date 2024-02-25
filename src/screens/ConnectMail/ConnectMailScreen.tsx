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
import useAuth from '@screens/Auth/hooks/useAuth';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';
import {BaseState} from '@redux/stores';
import FocusAwareStatusBar from '@services/statusBarService';

const ConnectMailScreen = () => {
  const insets = useSafeAreaInsets();
  const userProfile = useSelector(
    (state: BaseState) => state.userReducer.userProfile,
  );
  const {onGoogleLinkButtonPress} = useAuthProvider();
  const {handleSignOut} = useAuth();
  const {} = useConnectMail({autoRedirectToHome: true});

  return (
    <LayoutBackgroundDefaultV1
      containerStyle={{
        marginHorizontal: scale(25),
        flex: 1,
      }}>
      <FocusAwareStatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent
      />
      <View style={{paddingTop: scale(100), flex: 1}}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: insets.top,
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View>
            <Text style={[CommonStyles.font.semiBold14, {color: '#3c3c3c'}]}>
              Welcome back, {userProfile?.user_name?.split(' ')[0]}. Not you?
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: scale(1),
              borderBottomColor: Colors.primary,
            }}>
            <Text
              onPress={handleSignOut}
              style={[CommonStyles.font.bold14, {color: Colors.primary}]}>
              {' '}
              Log Out.
            </Text>
          </View>
          {/* <LogoutButton onPress={handleSignOut} /> */}
        </View>
        <Text style={[CommonStyles.font.bold30, styles.text]}>
          {t('Connect your\nGoogle accounts')}
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
            title={t('Connect your Google Account')}
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
