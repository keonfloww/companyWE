import IMAGES from '@assets/images/images';
import Avatar from '@components/atoms/Avatar/Avatar';
import BaseRowIconLabel from '@components/atoms/Row/BaseRowIconLabel';
import CommonStyles from '@screens/styles';
import navigationService from '@services/navigationService';
import {useUserUpdateMutation} from '@redux/slices/api/userApi.slice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {scale, scaleHeight} from '@utils/mixins';
import {t} from 'i18next';
import {Button, Colors} from 'react-native-ui-lib';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native-ui-lib';
import Modal from 'react-native-modal';
import {FC, useState} from 'react';
import {ColorUtils, EnumProfileColors, ProfileColors} from '@utils/colorUtils';
import {safeString} from '@utils/stringUtils';
import DatePickerModal from '../components/DatePickerModal';
import PhoneInput from '../components/PhoneInput';
import AddressInput from '../components/AddressInput';
import {useDispatch, useSelector} from 'react-redux';
import {BaseState} from '@redux/stores';
import {userSliceActions} from '@redux/slices/user.slice';
import DropDown from '../components/DropDown';
import ImageUtils from '@utils/imageUtils';
import {Alert} from 'react-native';
import {Image} from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import SafeViewForceInsets from '@components/atoms/View/SafeViewForceInsets';

/**
 * TODO: Vipin
 * rename the screen component with prefix is Profile. Not EditProfile
 * => Increate developer experience. We dont need to find the file.
 * Just type Profile => then all of the screens of profile here
 */
enum EnumGender {
  MALE = 'Male',
  FEMALE = 'Female',
}

const EditProfileScreen: FC = () => {
  /**
   * TODO: Vipin
   * Bring the login useSelector, useDispatch, RTK query into new custom hook
   * => Separate the logic with the UI
   */
  const userProfile = useSelector(
    (state: BaseState) => state.userReducer.userProfile,
  );
  const [userUpdate] = useUserUpdateMutation();
  const [datePicker, setDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(userProfile?.date_of_birth || '');
  const [gender, setGender] = useState(userProfile?.gender_id || null);
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState(userProfile?.user_address || '');
  const [phone, setPhone] = useState(userProfile?.phone_number || '');
  const [profileUrl, setProfileUrl] = useState(
    userProfile?.user_profile_picture || '',
  );
  const dispatch = useDispatch();

  const groupItems = [
    {
      label: t('Setting'),
      items: [
        {
          prefixIcon: <IMAGES.Photo color={'#3C3C3C'} />,
          title: t('Take Photo'),
          onPress: async () => {
            uploadFromCamera();
          },
          disabled: false,
        },
        {
          prefixIcon: <IMAGES.Upload color={'#3C3C3C'} />,
          title: t('Upload From Gallery'),
          onPress: () => {
            uploadFromGallery();
          },
          disabled: false,
        },
        {
          prefixIcon:
            profileUrl === '' ? (
              <IMAGES.DeleteDisable color={'#3C3C3C'} />
            ) : (
              <IMAGES.Delete color={'#3C3C3C'} />
            ),
          title: t('Remove Current Picture'),
          onPress: () => {
            setProfileUrl('');
            setModal(false);
          },
          disabled: profileUrl === '',
        },
      ],
    },
  ];

  /**
   * TODO: Vipin
   * Why you define enum gender as string, then you set value is number
   * If you have to do that => Create EnumGenderNumber
   * => Then create the constanst to transfer string gender to number gender
   *
   * Or you just use EnumGender as number
   */

  /**
   * TODO: Vipin
   * if(1) { do something; return;} if(2) {do something; return;}
   * DONT TRY TO IF ELSE
   */
  const onGenderChange = (val: any) => {
    if (val.value === EnumGender.MALE) {
      setGender(1);
    } else if (val.value === EnumGender.FEMALE) {
      setGender(2);
    } else {
      setGender(null);
    }
  };

  const uploadImage = async (path: any) => {
    setModal(false);
    setTimeout(async () => {
      global?.props?.showLoading();

      /**
       * TODO: Vipin
       * create the function in imageUtils for reusable
       */
      const filename = path.substring(path.lastIndexOf('/') + 1);
      const uploadpath =
        Platform.OS === 'ios' ? path.replace('file://', '') : path;
      const task = storage().ref(`images/${filename}`).putFile(uploadpath);
      task.on('state_changed', snapshot => {
        if (snapshot.bytesTransferred === snapshot.totalBytes) {
          snapshot.ref.getDownloadURL().then(url => {
            setLoading(true);
            setProfileUrl(url);
            console.log(url);
          });
        }
      });

      /**
       * TODO: Vipin
       * Why you only try catch below block. How about the above code error, then crash app?
       */
      try {
        await task;
      } catch (e) {
        console.error(e);
      }
      global?.props?.hideLoading();
    }, 10);
  };

  const uploadFromGallery = async () => {
    try {
      await ImageUtils.handleGalleryPermission({
        onBlocked: () => {
          Alert.alert(
            t('Gallery Permission', {key: t('Gallery')}),
            t('Gallery Permission is required for image upload', {
              key: t('Gallery'),
            }),
            [
              {
                text: t('Cancel'),
                style: 'cancel',
              },
              {
                text: t('Settings'),
                onPress: Linking.openSettings,
              },
            ],
          );
        },
      });
      const image: Image = await ImageUtils.openGallery();

      /**
       * TODO: Vipin
       * ImageUtils
       */
      let path = image.path;
      let uploadpath =
        Platform.OS === 'ios' ? path.replace('file://', '') : path;
      const data = await ImageUtils.openCropper({path: uploadpath});
      console.log({data});
      path = data.path;
      await uploadImage(path);
    } catch (e) {
      console.log(e);
    }
  };

  const uploadFromCamera = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      useFrontCamera: true,
    })
      .then(async image => {
        let path = image.path;
        /**
         * TODO: Vipin
         * ImageUtils
         */
        let uploadpath =
          Platform.OS === 'ios' ? path.replace('file://', '') : path;
        const data = await ImageUtils.openCropper({path: uploadpath});
        console.log({data});
        path = data.path;
        await uploadImage(path);
      })
      .catch(e => console.log(e));
  };

  const onSubmit = async () => {
    try {
      /**
       * TODO: Vipin
       * Install prettier, then fix error warning
       */
      global?.props?.showLoading();
      const data = await userUpdate({
        id: userProfile?.id,
        user_name: userProfile?.user_name,
        email_address: userProfile?.email_address,
        user_address: address,
        user_profile_picture: profileUrl,
        date_of_birth: date,
        phone_number: phone,
        gender_id: gender,
        accessToken: userProfile?.accessToken,
      });
      console.log(data);
      dispatch(
        userSliceActions.setUserProfile({
          ...userProfile,
          ...{
            id: userProfile?.id,
            user_name: userProfile?.user_name,
            email_address: userProfile?.email_address,
            user_address: address,
            user_profile_picture: profileUrl,
            date_of_birth: date,
            phone_number: phone,
            gender_id: gender,
            accessToken: userProfile?.accessToken,
          },
        }),
      );
      global?.props?.hideLoading();
      navigationService.goBack();
    } catch (error) {}
  };

  return (
    <SafeViewForceInsets isHasHeaderTabBar={true} isSafeBottom={false}>
      <View
        style={[
          CommonStyles.view.viewLayout,
          {marginTop: 0, marginBottom: scaleHeight(25)},
        ]}>
        <KeyboardAwareScrollView
          automaticallyAdjustKeyboardInsets={true}
          keyboardDismissMode="interactive"
          style={{display: 'flex'}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: scale(21),
            }}>
            {/* TODO: Vipin: separate it into meaningfull naming component */}
            {profileUrl ? (
              <View
                style={{
                  height: scale(130),
                  width: scale(130),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'lightgray',
                  borderRadius: scale(130),
                }}>
                <Avatar
                  source={{uri: profileUrl}}
                  size={scale(130)}
                  setLoading={setLoading}
                />
                {loading && (
                  <ActivityIndicator
                    color={'#ffffff'}
                    style={{position: 'absolute'}}
                  />
                )}
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
                  <IMAGES.icCamera height={14} width={16} color={'blue'} />
                </Pressable>
              </View>
            ) : (
              <View>
                <View
                  style={[
                    styles.logo,
                    {
                      backgroundColor: safeString(userProfile?.user_name)?.[0]
                        ? ColorUtils.getColorFromChar(userProfile?.user_name)
                            ?.SecondaryColor
                        : ProfileColors?.[EnumProfileColors.DEFAULT]
                            ?.SecondaryColor,
                    },
                  ]}>
                  <Text
                    style={[
                      {
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        color: safeString(userProfile?.user_name)?.[0]
                          ? ColorUtils.getColorFromChar(userProfile?.user_name)
                              ?.MainColor
                          : ProfileColors?.[EnumProfileColors.DEFAULT]
                              ?.MainColor,
                      },
                      CommonStyles.font.bold30,
                    ]}>
                    {safeString(userProfile?.user_name)[0]}
                  </Text>
                </View>
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
            )}
            <View style={{height: scale(20)}} />
            <Text
              style={[
                CommonStyles.font.bold24,
                {overflow: 'hidden', flexWrap: 'nowrap'},
              ]}>
              {userProfile?.user_name}
            </Text>
            <View style={{height: scale(20)}} />
          </View>
          <View style={{marginBottom: scale(10)}}>
            <Text style={[CommonStyles.font.bold16, {marginBottom: scale(10)}]}>
              Account Information
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: scale(15),
                alignItems: 'center',
                columnGap: scale(10),
              }}>
              <Text
                style={[
                  CommonStyles.font.semiBold14,
                  {marginRight: scale(10)},
                ]}>
                Email Address
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  CommonStyles.font.regular14,
                  {
                    color: '#8f8f8f',
                    flex: 1,
                    textAlign: 'right',
                  },
                ]}>
                {userProfile?.email_address}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: scale(15),
                alignItems: 'center',
              }}>
              <Text style={CommonStyles.font.semiBold14}>
                Account connected
              </Text>
              <Text style={[CommonStyles.font.semiBold14, {color: '#8f8f8f'}]}>
                Google
              </Text>
            </View>
          </View>

          <View style={{rowGap: scale(15)}}>
            <View style={{marginBottom: scale(10)}}>
              <Text
                style={[CommonStyles.font.bold16, {marginBottom: scale(10)}]}>
                Personal Information
              </Text>
              <View style={{marginBottom: scale(10)}}>
                <DropDown
                  value={!gender ? '' : gender === 1 ? 'Male' : 'Female'}
                  onChange={(val: any) => onGenderChange(val)}
                />
                <DatePickerModal
                  label={'Birthday'}
                  visible={datePicker}
                  setDatePicker={setDatePicker}
                  setDate={setDate}
                  value={date}
                  onChange={(val: any) => setDate(val)}
                />
                <PhoneInput
                  value={phone}
                  onChange={(val: any) => setPhone(val)}
                />
                <AddressInput
                  value={address}
                  onChange={(val: any) => setAddress(val)}
                />
              </View>
            </View>
            <View style={{height: scale(60)}} />
          </View>
        </KeyboardAwareScrollView>
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
                          disabled={item.disabled}
                          activeOpacity={item.disabled ? 1 : 0.7}
                          onPress={item?.onPress}>
                          <BaseRowIconLabel
                            titleStyle={{
                              color: item.disabled ? '#b0b0ac' : Colors.text,
                            }}
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
      </View>
      <View
        style={{
          height: 'auto',
          marginTop: 'auto',
          width: '100%',
          backgroundColor: '#fff',
          shadowColor: 'black',
          shadowOffset: {width: 1, height: 0.5},
          shadowRadius: scale(20),
          shadowOpacity: 0.1,
          elevation: scale(5),
          padding: scale(20),
          paddingBottom: scale(60),
          flexDirection: 'row',
          borderTopLeftRadius: scale(20),
          borderTopRightRadius: scale(20),
          justifyContent: 'space-between',
          gap: scale(10),
        }}>
        <Button
          label={'Save Changes'}
          onPress={onSubmit}
          style={[{flex: 1, paddingHorizontal: 0}]}
          labelStyle={[CommonStyles.font.regular14, {overflow: 'visible'}]}
          backgroundColor={'#50048A'}
        />
        <Button
          label={'Cancel'}
          onPress={navigationService.goBack}
          style={[{flex: 1, paddingHorizontal: 0}]}
          labelStyle={[CommonStyles.font.regular14, {overflow: 'visible'}]}
          backgroundColor={'white'}
          outlineColor={'#50048A'}
          color={'#50048A'}
        />
      </View>
    </SafeViewForceInsets>
  );
};

{
  /* TODO: Vipin: Using useColors for style */
}
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
  logo: {
    borderRadius: scale(130),
    borderColor: '#DADADA',
    borderWidth: scale(1),
    width: scale(130),
    height: scale(130),
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scale(2),
    paddingLeft: scale(0.5),
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
