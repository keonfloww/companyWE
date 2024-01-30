/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {FC} from 'react';
import {Pressable, StyleSheet, Text, View, useColorScheme} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {scale} from '../../utils/mixins';
import {Screen} from '@navigation/navigation.enums';
import BaseButton from '@components/atoms/Button/BaseButton';
import CommonStyles from '@screens/styles';
import {t} from 'i18next';
import IMAGES from '@assets/images/images';
import {withTheme} from '@utils/mixinsComponents';
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
import { BaseState } from '@redux/stores';

interface IFormData {
  email: string;
  password: string;
}

const SignUpScreen: FC<any> = () => {
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const connectedMails = useSelector(
      (state: BaseState) => state?.userReducer.connectedMails,
    );
  const {signInByGoogle} = useAuthProvider();
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const styless = withTheme(styles);
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

  const signInWithGoogle = async () => {
    const data = await signInByGoogle();
    console.log({useresr:data.user})
    AsyncStorage.setItem('user', JSON.stringify(data.user));
    // dispatch(userSliceActions.setUser(createdUser));
    if (!connectedMails.length) {
      navigationService.navigateAndReset(Screen.ConnectMailScreen);
      return;
    }
    navigationService.navigateAndReset(Screen.MainTabBar);
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeView style={backgroundStyle}>
      <View
        style={{
          position: 'absolute',
          top: 50,
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
      <View>
        <IMAGES.welcomeCircle />
      </View>
      <View style={styless.view}>
        <Text style={[CommonStyles.font.bold30, {color: '#3c3c3c'}]}>
          Sign Up
        </Text>
        <Text
          style={[
            CommonStyles.font.regular14,
            {color: '#3c3c3c', marginTop: scale(10)},
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
            style={styless.inputStyle}
            containerStyle={styless.inputContainerStyle}
            labelStyle={[CommonStyles.font.semiBold14, styless.labelStyle]}
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
            style={styless.inputStyle}
            containerStyle={styless.inputContainerStyle}
            labelStyle={[CommonStyles.font.semiBold14, styless.labelStyle]}
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
          height: scale(1),
          backgroundColor: '#EFEFEF',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: scale(10),
          marginHorizontal: scale(20),
        }}>
        <Text
          style={{
            position: 'absolute',
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            borderRadius: scale(100),
          }}>
          OR
        </Text>
      </View>
      <View style={{marginHorizontal: scale(20), flexDirection: 'row'}}>
        <ServiceButton
          type={EnumAuthProviderButtonType.SIGN_UP}
          containerStyle={styless.baseButton}
          authProvider={EnumAuthProviderButton.GOOGLE}
          onPress={signInWithGoogle}
          titleContainerStyles={{display: 'none'}}
        />
      </View>
      <View style={{margin: scale(20)}}>
        <Text>
          Have an account?{' '}
          <Text
            style={[CommonStyles.font.semiBold14, {color: '#50048A'}]}
            onPress={() => navigationService.navigateAndReset(Screen.Login)}>
            Sign in
          </Text>
        </Text>
      </View>
    </SafeView>
  );
};
export default SignUpScreen;

const styles = ({theme}: any) =>
  StyleSheet.create({
    text: {
      color: '#3C3C3C',
      marginBottom: scale(10),
    },
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
      color: '#3C3C3C',
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
