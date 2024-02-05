/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {FC} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native-ui-lib';
import {scale} from '../../utils/mixins';
import {Screen} from '@navigation/navigation.enums';
import BaseButton from '@components/atoms/Button/BaseButton';
import CommonStyles from '@screens/styles';
import {t} from 'i18next';
import IMAGES from '@assets/images/images';
import FormItemController from '@components/atoms/Form/FormItemController';
import {useForm} from 'react-hook-form';
import ServiceButton, {
  EnumAuthProviderButton,
  EnumAuthProviderButtonType,
} from '@components/atoms/ServiceButton/ServiceButton';
import navigationService from '@services/navigationService';
import LayoutBackgroundDefault from '@layouts/default/LayoutBackgroundDefault';
import BaseModal from '@components/atoms/Modal/BaseModal';
import useAuth from './hooks/useAuth';

interface IFormData {
  email: string;
  password: string;
}

const SignUpScreen: FC<any> = () => {
  // TODO: Vipin move it to /utils/RegexUtils.ts
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const {signInOrSignUpByFirebase} = useAuth();

  const [termModalShow, setTermModalShow] = useState(false);
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

  const onSubmit = (_data: IFormData) => {
    // TODO: Vipin. Why did you not implement it?
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
        <Text style={[CommonStyles.font.bold30, {color: '#3C3C3C'}]}>
          Sign Up
        </Text>
        <Text
          style={[
            CommonStyles.font.regular14,
            {color: '#3C3C3C', marginTop: scale(10)},
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
          marginHorizontal: scale(25),
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
      <View style={{marginHorizontal: scale(25)}}>
        <ServiceButton
          type={EnumAuthProviderButtonType.SIGN_UP}
          containerStyle={styles.baseButton}
          authProvider={EnumAuthProviderButton.GOOGLE}
          onPress={() => setTermModalShow(true)}
          titleStyles={[CommonStyles.font.regular14,styles.connectText]}
        />
      </View>
      <View style={{marginHorizontal: scale(25), marginVertical: scale(20)}}>
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
        onConfirm={() => {
          setTermModalShow(false);
          signInOrSignUpByFirebase({isSignUp: true});
        }}
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
    color: '#3C3C3C',
    marginBottom: scale(10),
  },
  connectText: {
    color: '#50048A',
    fontWeight: '400',
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
    color: '#3C3C3C',
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
