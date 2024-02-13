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
import {useUserUpdateMutation} from '@redux/slices/api/userApi.slice';
import {scale} from '@utils/mixins';
import {t} from 'i18next';
import moment from 'moment';
import {Button} from 'react-native-ui-lib';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native-ui-lib';
import Modal from 'react-native-modal';
import {useState} from 'react';
import SafeView from '@components/atoms/View/SafeView';
import FormItemController from '@components/atoms/Form/FormItemController';
import {useForm} from 'react-hook-form';
import BaseButton from '@components/atoms/Button/BaseButton';
import {ProfileColors} from '@utils/colorUtils';
import {safeString} from '@utils/stringUtils';
import DatePicker from '../components/DatePicker';
import DropDown from '../components/DropDown';
import PhoneInput from '../components/PhoneInput';
import AddressInput from '../components/AddressInput';
import {useDispatch, useSelector} from 'react-redux';
import {BaseState} from '@redux/stores';
import {userSliceActions} from '@redux/slices/user.slice';

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

  const userProfile = useSelector(
    (state: BaseState) => state.userReducer.userProfile,
  );
  const [userUpdate] = useUserUpdateMutation();
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(userProfile.date_of_birth || '');
  const [gender, setGender] = useState('Male');
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState(userProfile.user_address || '');
  const [phone, setPhone] = useState(userProfile.phone_number || '');
  const dispatch = useDispatch();

  const onSubmit = async () => {
    const data = await userUpdate({
      id: userProfile.id,
      user_name: userProfile.user_name,
      email_address: userProfile.email_address,
      user_address: 'address',
      user_profile_picture: '',
      date_of_birth: date,
      phone_number: phone,
      accessToken: userProfile.accessToken,
    });
    console.log(data);
    if (!data.error) {
    } else {
      console.log(data?.error?.data?.message);
    }
    dispatch(
      userSliceActions.setUserProfile({
        ...userProfile,
        ...{
          id: userProfile.id,
          user_name: userProfile.user_name,
          email_address: userProfile.email_address,
          user_address: address,
          user_profile_picture: '',
          date_of_birth: date,
          phone_number: phone,
          accessToken: userProfile.accessToken,
        },
      }),
    );
    navigationService.goBack();
  };

  return (
    <SafeView>
      <View style={CommonStyles.view.viewLayout}>
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          keyboardDismissMode="interactive"
          style={{display: 'flex'}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: scale(30),
            }}>
            {userProfile?.user_profile_picture ? (
              <View>
                <Avatar
                  source={{uri: userProfile?.user?.photoURL ?? ''}}
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
            ) : (
              <View>
                <View
                  style={[
                    styles.logo,
                    {
                      backgroundColor:
                        ProfileColors[safeString(userProfile?.user_name)[0]]
                          .SecondaryColor,
                    },
                  ]}>
                  <Text
                    style={[
                      {
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        color:
                          ProfileColors[safeString(userProfile?.user_name)[0]]
                            .MainColor,
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
          </View>

          <View style={{rowGap: scale(15)}}>
            <View style={{marginBottom: scale(10)}}>
              <Text
                style={[CommonStyles.font.bold16, {marginBottom: scale(10)}]}>
                Personal Information
              </Text>
              <View style={{marginBottom: scale(10)}}>
                <DropDown
                  value={gender}
                  onChange={(val: any) => setGender(val)}
                />
                <DatePicker
                  visible={datePicker}
                  label="Birthday"
                  value={date}
                  setDatePicker={setDatePicker}
                  setDate={setDate}
                  mode="date"
                  // onChange={val => setGender(val)}
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
        </ScrollView>
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
          elevation: scale(2),
          padding: scale(20),
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
          label={'cancel'}
          // onPress={onClose}
          style={[{flex: 1, paddingHorizontal: 0}]}
          labelStyle={[CommonStyles.font.regular14, {overflow: 'visible'}]}
          backgroundColor={'white'}
          outlineColor={'#50048A'}
          color={'#50048A'}
        />
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
  logo: {
    borderRadius: scale(130),
    borderColor: '#DADADA',
    borderWidth: scale(1),
    width: scale(130),
    height: scale(130),
    alignItems: 'center',
    justifyContent: 'center',
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
