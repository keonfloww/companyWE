/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {scale} from '../../utils/mixins';
import CommonStyles from '@screens/styles';
import IMAGES from '@assets/images/images';
import FormItemController from '@components/atoms/Form/FormItemController';
import {useForm} from 'react-hook-form';
import useAuth from './hooks/useAuth';
import {SafeAreaView} from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
import {colors} from 'src/themes';
import AppButton from '@components/atoms/AppButton';
import {SCREEN_WIDTH} from 'src/themes/mixins';
interface IFormData {
  account?: string;
  password?: string;
}

const LoginScreen: FC<any> = () => {
  const {signInOrSignUpByFirebase} = useAuth();

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    watch,
  } = useForm<IFormData>({
    defaultValues: {
      account: '',
      password: '',
    },
  });

  const [formData, setFormData] = useState<IFormData>({
    account: '',
    password: '',
  });
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  useEffect(() => {
    const subscription = watch(value => setFormData(value));
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: IFormData) => {
    console.log({data, errors});
    // navigationService.navigateAndReset(Screen.ConnectMailScreen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: scale(20), marginBottom: scale(10)}}>
        <Image source={IMAGES.icAppIcon} style={styles.logo} />
        <FormItemController
          control={control}
          errors={errors}
          label={'Your account'}
          textContentType="emailAddress"
          rules={{
            required: 'Please enter a valid email address',
          }}
          style={styles.inputStyle}
          containerStyle={styles.inputContainerStyle}
          labelStyle={[CommonStyles.font.semiBold14, styles.labelStyle]}
          placeholder={'Enter your account'}
          name={'account'}
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
          placeholder={'Enter your password'}
          secureTextEntry={true}
          name={'password'}
        />
      </View>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          disabled={formData.account ? false : true}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
          boxType={'square'}
          animationDuration={0}
          style={styles.checkBox}
          onCheckColor={colors.white}
          onTintColor={colors.appColor}
          onFillColor={colors.appColor}
        />
        <Text style={styles.checkBoxText}>자동로그인</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          text="로그인"
          disabled={formData.account && formData.password ? false : true}
        />
        <Text style={styles.contactText}>
          계정 분실 시 관리자에게 문의바랍니다
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    backgroundColor: colors.white,
    flex: 1,
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
  logo: {alignSelf: 'center', marginVertical: scale(60)},
  checkBoxContainer: {flexDirection: 'row'},
  checkBoxText: {
    fontWeight: '400',
    fontSize: 14,
  },
  checkBox: {
    width: scale(16),
    height: scale(16),
    marginRight: scale(8),
    borderWidth: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: scale(30),
    left: 0,
    right: 0,
    paddingHorizontal: scale(20),
  },
  contactText: {alignSelf: 'center', marginTop: scale(20)},
});
