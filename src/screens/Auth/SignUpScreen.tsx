/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Colors} from 'react-native-ui-lib';
import {scale} from '../../utils/mixins';
import {Screen} from '@navigation/navigation.enums';
import BaseButton from '@components/atoms/Button/BaseButton';
import CommonStyles from '@screens/styles';
import {t} from 'i18next';
import IMAGES from '@assets/images/images';
import SafeView from '@components/atoms/View/SafeView';
import FormItemController from '@components/atoms/Form/FormItemController';
import {useForm} from 'react-hook-form';
import ServiceButton, {
  EnumAuthProviderButton,
  EnumAuthProviderButtonType,
} from '@components/atoms/ServiceButton/ServiceButton';
import useAuthProvider from '@utils/hooks/useAuthProvider';
import {useDispatch, useSelector} from 'react-redux';
import {userSliceActions} from '@redux/slices/user.slice';
import navigationService from '@services/navigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseState} from '@redux/stores';
import LayoutBackgroundDefault from '@layouts/default/LayoutBackgroundDefault';
import BaseModal from '@components/atoms/Modal/BaseModal';
import { useUserRegisterMutation } from '@redux/slices/api/userApi.slice';

interface IFormData {
  email: string;
  password: string;
}

const SignUpScreen: FC<any> = () => {
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const [userRegister] = useUserRegisterMutation();
  const connectedMails = useSelector(
    (state: BaseState) => state?.userReducer.connectedMails,
  );
  const [termModalShow, setTermModalShow] = useState(false);
  const {signInByGoogle} = useAuthProvider();
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: IFormData) => {
    // console.log({data, errors});
    // navigationService.navigateAndReset(Screen.ConnectMailScreen);
  };

  const modalChildren = (
    <View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('../../assets/images/png/terms.png')} />
      </View>
      <Text style={[CommonStyles.font.bold24, styles.modalText]}>
        Please accept Terms and Conditions and Privacy Policy
      </Text>
      <Text style={[CommonStyles.font.regular14, styles.modalText]}>
        By clicking Accept & Join, you agree to Troove’s{' '}
        <Text style={[CommonStyles.font.semiBold14, styles.termText]}>
          Terms and Conditions
        </Text>{' '}
        and{' '}
        <Text style={[CommonStyles.font.semiBold14, styles.termText]}>
          Privacy Policy
        </Text>
      </Text>
    </View>
  );

  const signInWithGoogle = async () => {
    setTermModalShow(false);
    const {userData, accessToken} = await signInByGoogle();
    console.log({useresr: userData.user});
    AsyncStorage.setItem('user', JSON.stringify(userData.user));
    userRegister({
      id: userData.user.uid.toString(),
      user_name: userData.user.displayName.toString(),
      email_address: userData.user.email.toString(),
      is_email_address_verified: userData.user.emailVerified,
      sign_up_provider_id: 1,
      accessToken: accessToken,
    }).unwrap();
    // dispatch(userSliceActions.setUser(createdUser));
    if (!connectedMails.length) {
      navigationService.navigateAndReset(Screen.ConnectMailScreen);
      return;
    }
    navigationService.navigateAndReset(Screen.MainTabBar);
  };

  return (
    <LayoutBackgroundDefault>
      <View
        style={{
          // position: 'absolute',
          marginTop: scale(30),
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
          zIndex: 1111,
          paddingHorizontal: scale(30),
        }}>
        <Pressable
          onPress={navigationService.goBack}
          style={{height: scale(25), width: scale(25)}}>
          <IMAGES.arrowLeft />
        </Pressable>
      </View>
      <View style={{height: scale(80)}}></View>
      <View style={styles.view}>
        <Text style={[CommonStyles.font.bold30, {color: Colors.text}]}>
          Sign Up
        </Text>
        <Text
          style={[
            CommonStyles.font.regular14,
            {color: Colors.text, marginTop: scale(10)},
          ]}>
          Enter your email and set a password
        </Text>
        <View style={{marginTop: scale(20), marginBottom: scale(10)}}>
          <FormItemController
            control={control}
            errors={errors}
            label={'Email Address'}
            textContentType="emailAddress"
            rules={{
              required: 'Please enter a valid email address',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Please enter a valid email address',
              },
            }}
            style={styles.inputStyle}
            containerStyle={styles.inputContainerStyle}
            labelStyle={[CommonStyles.font.semiBold14, styles.labelStyle]}
          />
          <FormItemController
            control={control}
            errors={errors}
            label={'Password'}
            textContentType="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password should be at least 8 characters long',
              },
            }}
            style={styles.inputStyle}
            containerStyle={styles.inputContainerStyle}
            labelStyle={[CommonStyles.font.semiBold14, styles.labelStyle]}
          />
        </View>
        <BaseButton
          title={t('Register')}
          titleStyle={CommonStyles.font.regular14}
          onPress={handleSubmit(onSubmit)}
          size="lg"
          containerStyle={{}}
        />
      </View>
      <View
        style={{
          // height: scale(1),
          flexDirection: 'row',
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          // marginVertical: scale(10),
          marginHorizontal: scale(20),
        }}>
        <View style={{height: scale(1), backgroundColor: '#EFEFEF', flex:1}}></View>
        <Text
          style={{
            // position: 'absolute',
            backgroundColor: 'transparent',
            borderRadius: scale(100),
            marginHorizontal: scale(10),
            color: '#3C3C3C'
          }}>
          OR
        </Text>
        <View style={{height: scale(1), backgroundColor: '#EFEFEF', flex: 1}}></View>
      </View>
      <View style={{marginHorizontal: scale(20), flexDirection: 'row'}}>
        <ServiceButton
          type={EnumAuthProviderButtonType.SIGN_UP}
          containerStyle={styles.baseButton}
          authProvider={EnumAuthProviderButton.GOOGLE}
          onPress={() => setTermModalShow(true)}
          titleContainerStyles={{display: 'none'}}
        />
      </View>
      <View style={{margin: scale(20)}}>
        <Text style={{color: '#3C3C3C'}}>
          Have an account?{' '}
          <Text
            style={[CommonStyles.font.semiBold14, {color: '#50048A'}]}
            onPress={() => navigationService.navigate(Screen.Login)}>
            Sign in
          </Text>
        </Text>
      </View>
      <BaseModal
        isShow={termModalShow}
        headerShown={false}
        backdropOpacity={0.5}
        onClose={() => setTermModalShow(false)}
        onConfirm={signInWithGoogle}
        actionViewStyle={{height: scale(40)}}
        buttonContainerStyle={{paddingVertical: scale(0)}}
        children={modalChildren}
        cancelTitle="No"
        confirmTitle="Accept"
      />
    </LayoutBackgroundDefault>
  );
};
export default SignUpScreen;

const styles = StyleSheet.create({
  text: {
    color: Colors.text,
    marginBottom: scale(10),
  },
  termText: {
    color: '#50048A',
  },
  modalText: {textAlign: 'center', padding: scale(5), color: '#3C3C3C'},
  view: {
    marginHorizontal: scale(25),
    marginVertical: scale(20),
  },
  paginationDot: {
    borderRadius: scale(6),
    width: scale(6),
    height: scale(6),
    margin: scale(5),
    backgroundColor: 'lightgray',
  },
  pagination: {
    // width: Dimensions.get('screen').width,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: scale(10),
    marginBottom: scale(40),
    marginHorizontal: scale(20),
    //  backgroundColor: 'red'
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: scale(100),
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    // marginBottom: scale(12),
    height: scale(40),
  },
  inputContainerStyle: {
    marginBottom: scale(14),
  },
  labelStyle: {
    color: Colors.text,
  },
  baseButton: {
    backgroundColor: 'white',
    marginTop: scale(15),
    borderRadius: 99,
    borderWidth: 1,
    flex: 0,
    borderColor: '#50048A',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
