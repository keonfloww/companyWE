import IMAGES from '@assets/images/images';
import Avatar from '@components/atoms/Avatar/Avatar';
import LogoutButton from '@components/atoms/LogoutButton';
import BaseRowIconLabel from '@components/atoms/Row/BaseRowIconLabel';
import LayoutBackgroundDefaultV1 from '@layouts/default/LayoutBackgroundDefaultV1';
import {Screen} from '@navigation/navigation.enums';
import {BaseState} from '@redux/stores';
import useAuth from '@screens/Auth/hooks/useAuth';
import CommonStyles from '@screens/styles';
import navigationService from '@services/navigationService';
import {EnumProfileColors, ProfileColors} from '@utils/colorUtils';
import {scale} from '@utils/mixins';
import {safeString} from '@utils/stringUtils';
import {t} from 'i18next';
import moment from 'moment';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';

const ProfileIndexScreen = () => {
  const userProfile = useSelector(
    (state: BaseState) => state.userReducer.userProfile,
  );
  const {handleSignOut} = useAuth();

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

  console.log('userProfile', userProfile);
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
          {userProfile?.user_profile_picture ? (
            <Avatar
              source={{uri: userProfile?.user_profile_picture}}
              size={scale(130)}
            />
          ) : (
            <View
              style={[
                styles.logo,
                {
                  backgroundColor: safeString(userProfile?.user_name)?.[0] ?
                    ProfileColors?.[
                      safeString(userProfile?.user_name)?.[0].toUpperCase() ||
                        EnumProfileColors.DEFAULT
                    ]?.SecondaryColor : ProfileColors?.[EnumProfileColors.DEFAULT]?.SecondaryColor,
                },
              ]}>
              <Text
                style={[
                  {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: safeString(userProfile?.user_name)?.[0] ?
                      ProfileColors?.[
                        safeString(userProfile?.user_name)?.[0].toUpperCase() ||
                          EnumProfileColors.DEFAULT
                      ]?.MainColor : ProfileColors?.[EnumProfileColors.DEFAULT]?.MainColor,
                  },
                  CommonStyles.font.bold30,
                ]}>
                {safeString(userProfile?.user_name)[0]}
              </Text>
            </View>
          )}
          <View style={{height: scale(20)}} />
          <Text style={CommonStyles.font.bold24}>{userProfile?.user_name}</Text>
          <Text style={CommonStyles.font.regular14}>
            Member since{' '}
            {moment(userProfile?.user?.metadata?.creationTime).year()}
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
            <Text style={[CommonStyles.font.semiBold14, {marginRight: scale(10)}]}>Email Address</Text>
            <Text
              numberOfLines={1}
              style={[
                CommonStyles.font.regular14,
                {color: '#8f8f8f', flex: 1},
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
                alwaysBounceVertical={false}
                overScrollMode="never"
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
