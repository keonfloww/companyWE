import IMAGES from '@assets/images/images';
import Avatar from '@components/atoms/Avatar/Avatar';
import LogoutButton from '@components/atoms/LogoutButton';
import BaseRowIconLabel from '@components/atoms/Row/BaseRowIconLabel';
import LayoutBackgroundDefaultV1 from '@layouts/default/LayoutBackgroundDefaultV1';
import {Screen} from '@navigation/navigation.enums';
import useAuth from '@screens/Auth/hooks/useAuth';
import CommonStyles from '@screens/styles';
import navigationService from '@services/navigationService';
import {ProfileColors} from '@utils/colorUtils';
import {scale} from '@utils/mixins';
import {safeString} from '@utils/stringUtils';
import {t} from 'i18next';
import moment from 'moment';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native-ui-lib';

const ProfileIndexScreen = () => {
  const {authUser, handleSignOut} = useAuth();

  const groupItems = [
    {
      label: t('Setting'),
      items: [
        {
          prefixIcon: <IMAGES.IcProfile color={'#3C3C3C'} />,
          title: t('Edit Profile Detail'),
          onPress: () => {
            navigationService.navigate(Screen.EditProfileScreen);
          },
        },
        {
          prefixIcon: <IMAGES.IcConnected color={'#3C3C3C'} />,
          title: t('Connected Email Accounts'),
          onPress: () => {
            navigationService.navigate(Screen.ProfileConnectedMailScreen);
          },
        },
      ],
    },
    {
      label: t('Information'),
      items: [
        {
          prefixIcon: <IMAGES.IcTerms color={'#3C3C3C'} />,
          title: t('Terms and Conditions'),
          onPress: () => {},
        },
        {
          prefixIcon: <IMAGES.IcPrivacy color={'#3C3C3C'} />,
          title: t('Privacy Policy'),
          onPress: () => {},
        },
        {
          prefixIcon: <IMAGES.IcContact color={'#3C3C3C'} />,
          title: t('Contact Us'),
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <LayoutBackgroundDefaultV1
      containerStyle={{
        marginHorizontal: scale(25),
        flex: 1,
      }}>
      <View style={{display: 'flex'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: scale(30),
          }}>
          {authUser?.user_profile_picture ? (
            <Avatar
              source={{uri: authUser?.user_profile_picture}}
              size={scale(130)}
            />
          ) : (
            <View
              style={[
                styles.logo,
                {
                  backgroundColor:
                    ProfileColors[safeString(authUser?.user_name)[0]]
                      .SecondaryColor,
                },
              ]}>
              <Text
                style={[
                  {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color:
                      ProfileColors[safeString(authUser?.user_name)[0]]
                        .MainColor,
                  },
                  CommonStyles.font.bold30,
                ]}>
                {safeString(authUser?.user_name)[0]}
              </Text>
            </View>
          )}
          <View style={{height: scale(20)}} />
          <Text style={CommonStyles.font.bold24}>{authUser?.user_name}</Text>
          <Text style={CommonStyles.font.regular14}>
            Member since {moment(authUser?.user?.metadata?.creationTime).year()}
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
            }}>
            <Text style={CommonStyles.font.semiBold14}>Email Address</Text>
            <Text style={[CommonStyles.font.regular14, {color: '#8f8f8f'}]}>
              {authUser?.email_address}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: scale(15),
              alignItems: 'center',
            }}>
            <Text style={CommonStyles.font.semiBold14}>Account connected</Text>
            <Text style={[CommonStyles.font.semiBold14, {color: '#8f8f8f'}]}>
              Google
            </Text>
          </View>
        </View>

        <View style={{rowGap: scale(15)}}>
          {groupItems.map(item => {
            return (
              <FlatList
                key={item?.label}
                ListHeaderComponentStyle={{marginBottom: scale(10)}}
                keyExtractor={item => item?.title}
                ListHeaderComponent={
                  <View>
                    <Text style={CommonStyles.font.bold16}>{item.label}</Text>
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
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <LogoutButton onPress={handleSignOut} />
      </View>
      <View style={{height: scale(26)}} />
    </LayoutBackgroundDefaultV1>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: scale(12),
    paddingHorizontal: scale(20),
    paddingBottom: scale(10),
    backgroundColor: 'white',
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
  mailContent: {flex: 1},
  mailFirstRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  senderName: {
    ...CommonStyles.font.semiBold16,
    color: '#3C3C3C',
  },
  subject: {
    ...CommonStyles.font.semiBold14,
    color: '#3C3C3C',
  },
  dateTime: {
    ...CommonStyles.font.semiBold12,
    color: '#3C3C3C',
  },
  shortBody: {
    ...CommonStyles.font.regular14,
    color: '#3C3C3C',
  },
  textDisable: {
    color: '#757575',
    fontFamily: CommonStyles.fontFamily.regular,
  },
});
export default ProfileIndexScreen;
