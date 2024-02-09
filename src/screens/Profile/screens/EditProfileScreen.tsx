import IMAGES from '@assets/images/images';
import Avatar from '@components/atoms/Avatar/Avatar';
import LogoutButton from '@components/atoms/LogoutButton';
import BaseModal from '@components/atoms/Modal/BaseModal';
import BaseRowIconLabel from '@components/atoms/Row/BaseRowIconLabel';
import LayoutBackgroundDefaultV1 from '@layouts/default/LayoutBackgroundDefaultV1';
import {Screen} from '@navigation/navigation.enums';
import useAuth from '@screens/Auth/hooks/useAuth';
import CommonStyles from '@screens/styles';
import navigationService from '@services/navigationService';
import {scale} from '@utils/mixins';
import {t} from 'i18next';
import moment from 'moment';
import {FlatList, Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native-ui-lib';
import Modal from 'react-native-modal';
import {useState} from 'react';
import SafeView from '@components/atoms/View/SafeView';
import FormItemController from '@components/atoms/Form/FormItemController';
import {useForm} from 'react-hook-form';
import BaseButton from '@components/atoms/Button/BaseButton';

interface IFormData {
  email: string;
  password: string;
}

const EditProfileScreen = () => {
  const groupItems = [
    {
      label: t('Setting'),
      items: [
        {
          prefixIcon: <IMAGES.IcProfile color={'#3C3C3C'} />,
          title: t('Take Photo'),
          onPress: () => {
            // navigationService.navigate(Screen.EditProfileScreen);
          },
        },
        {
          prefixIcon: <IMAGES.IcConnected color={'#3C3C3C'} />,
          title: t('Upload From Gallery'),
          onPress: () => {
            // navigationService.navigate(Screen.ProfileConnectedMailScreen);
          },
        },
        {
          prefixIcon: <IMAGES.IcConnected color={'#3C3C3C'} />,
          title: t('Remove Current Picture'),
          onPress: () => {
            // navigationService.navigate(Screen.ProfileConnectedMailScreen);
          },
        },
      ],
    },
  ];
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const {authUser} = useAuth();
  const [modal, setModal] = useState(false);

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

  return (
    <SafeView>
      <View style={CommonStyles.view.viewLayout}>
        <View style={{display: 'flex'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: scale(30),
            }}>
            <View>
              <Avatar
                source={{uri: authUser?.user?.photoURL ?? ''}}
                size={scale(130)}
              />
              <Pressable
                onPress={() => setModal(true)}
                style={{
                  position: 'absolute',
                  bottom: 5,
                  right: 5,
                  backgroundColor: '#50048A',
                  zIndex: 9999,
                  width: scale(30),
                  height: scale(30),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: scale(30),
                }}>
                <IMAGES.icCamera
                  style={{}}
                  height={14}
                  width={16}
                  color={'blue'}
                />
              </Pressable>
            </View>
            <View style={{height: scale(20)}} />
          </View>

          <View style={{rowGap: scale(15)}}>
            <View style={{marginBottom: scale(10)}}>
              <Text
                style={[CommonStyles.font.bold16, {marginBottom: scale(10)}]}>
                Personal Information
              </Text>
              <View style={{marginBottom: scale(10)}}>
                <FormItemController
                  control={control}
                  errors={errors}
                  label={'Gender'}
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
                  label={'Birthday'}
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
                <FormItemController
                  control={control}
                  errors={errors}
                  label={'Phone Number'}
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
                <FormItemController
                  control={control}
                  errors={errors}
                  label={'Address'}
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
            </View>
          </View>
        </View>
        <Modal
          isVisible={modal}
          style={{padding: 0, margin: 0, backgroundColor: 'transparent'}}>
          <Pressable
            style={{backgroundColor: 'transparent', height: '80%'}}
            onPress={() => setModal(false)}></Pressable>
          <View
            style={{
              height: 'auto',
              marginTop: 'auto',
              width: '100%',
              backgroundColor: '#FFFFFF',
              padding: scale(25),
              borderTopLeftRadius: scale(20),
              borderTopRightRadius: scale(20),
            }}>
            <View style={{rowGap: scale(15)}}>
              {groupItems.map(item => {
                return (
                  <FlatList
                    key={item?.label}
                    ListHeaderComponentStyle={{marginBottom: scale(10)}}
                    keyExtractor={item => item?.title}
                    ListHeaderComponent={
                      <View>
                        <Text style={CommonStyles.font.bold16}>
                          {item.label}
                        </Text>
                      </View>
                    }
                    data={item?.items}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={item?.onPress}>
                          <BaseRowIconLabel
                            prefixIcon={item.prefixIcon}
                            title={item.title}
                          />
                        </TouchableOpacity>
                      );
                    }}
                    ItemSeparatorComponent={() => (
                      <View style={{height: scale(15)}} />
                    )}
                  />
                );
              })}
            </View>
          </View>
        </Modal>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: scale(10),
          }}>
          <BaseButton
            title={'Save Changes'}
            titleStyle={CommonStyles.font.regular14}
            onPress={handleSubmit(onSubmit)}
            size="lg"
            containerStyle={{}}
          />
          <BaseButton title={'Save Changes'} />
        </View> */}
      </View>
    </SafeView>
  );
};

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
export default EditProfileScreen;
