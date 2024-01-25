import ServiceButton, {
  EnumAuthProviderButton,
  EnumAuthProviderButtonType,
} from '@components/atoms/ServiceButton/ServiceButton';
import {Divider} from '@rneui/base';
import {CardBase} from '@rneui/base/dist/Card/Card';
import {Button} from '@rneui/themed';
import useAuthProvider from '@utils/hooks/useAuthProvider';
import {scale} from '@utils/mixins';
import {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, StyleSheet, View} from 'react-native';
import { IUser } from '@models/users/user.type';
import { RootState } from '@redux/stores';

/*
Show case the common component
or just for testing purpose */
const StoryBookScreen: FC = () => {
  const {signInByGoogle, onGoogleLinkButtonPress, signOut} = useAuthProvider();
  const user = useSelector((state: RootState) => state.userReducer.user);
  console.log('--->>>',{user});

  return (
    <ScrollView style={{flex: 1}}>
      <CardBase>
        <ServiceButton
          containerStyle={styles.baseButton}
          type={EnumAuthProviderButtonType.SIGN_IN}
          authProvider={EnumAuthProviderButton.APPLE}
        />
        <ServiceButton
          containerStyle={styles.baseButton}
          type={EnumAuthProviderButtonType.SIGN_UP}
          authProvider={EnumAuthProviderButton.APPLE}
        />
        <ServiceButton
          containerStyle={styles.baseButton}
          type={EnumAuthProviderButtonType.CONNECT}
          authProvider={EnumAuthProviderButton.APPLE}
        />

        <ServiceButton
          type={EnumAuthProviderButtonType.SIGN_IN}
          containerStyle={styles.baseButton}
          authProvider={EnumAuthProviderButton.GOOGLE}
          onPress={signInByGoogle}
        />
        <ServiceButton
          type={EnumAuthProviderButtonType.SIGN_UP}
          containerStyle={styles.baseButton}
          authProvider={EnumAuthProviderButton.GOOGLE}
          onPress={signInByGoogle}
        />
        <ServiceButton
          type={EnumAuthProviderButtonType.CONNECT}
          containerStyle={styles.baseButton}
          authProvider={EnumAuthProviderButton.GOOGLE}
          onPress={onGoogleLinkButtonPress}
        />

        <ServiceButton
          type={EnumAuthProviderButtonType.SIGN_IN}
          containerStyle={styles.baseButton}
          authProvider={EnumAuthProviderButton.YAHOO}
        />
        <ServiceButton
          type={EnumAuthProviderButtonType.SIGN_UP}
          containerStyle={styles.baseButton}
          authProvider={EnumAuthProviderButton.YAHOO}
          onPress={signInByGoogle}
        />
        <ServiceButton
          type={EnumAuthProviderButtonType.CONNECT}
          containerStyle={styles.baseButton}
          authProvider={EnumAuthProviderButton.YAHOO}
          onPress={signInByGoogle}
        />

        <ServiceButton
          type={EnumAuthProviderButtonType.SIGN_UP}
          containerStyle={styles.baseButton}
          authProvider={EnumAuthProviderButton.MICROSOFT}
        />
        <ServiceButton
          type={EnumAuthProviderButtonType.SIGN_IN}
          containerStyle={styles.baseButton}
          authProvider={EnumAuthProviderButton.MICROSOFT}
        />
        <ServiceButton
          type={EnumAuthProviderButtonType.CONNECT}
          containerStyle={styles.baseButton}
          authProvider={EnumAuthProviderButton.MICROSOFT}
        />
        <View style={{height: scale(25)}}></View>
        <Button title={'Sign out'} onPress={signOut} />
      </CardBase>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    backgroundColor: 'white',
    marginTop: scale(15),
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#50048A',
  },
});

export default StoryBookScreen;
