import IMAGES from '@assets/images/images';
import Avatar from '@components/atoms/Avatar/Avatar';
import LogoutButton from '@components/atoms/LogoutButton';
import BaseRowIconLabel from '@components/atoms/Row/BaseRowIconLabel';
import LayoutBackgroundDefaultV1 from '@layouts/default/LayoutBackgroundDefaultV1';
import {Screen} from '@navigation/navigation.enums';
import useAuth from '@screens/Auth/hooks/useAuth';
import CommonStyles from '@screens/styles';
import navigationService from '@services/navigationService';
import {scale} from '@utils/mixins';
import {t} from 'i18next';
import moment from 'moment';
import {FlatList, TouchableOpacity} from 'react-native';
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
        },
        {
          prefixIcon: <IMAGES.IcProfile color={'#3C3C3C'} />,
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
          prefixIcon: <IMAGES.IcProfile color={'#3C3C3C'} />,
          title: t('Terms and Conditions'),
        },
        {
          prefixIcon: <IMAGES.IcProfile color={'#3C3C3C'} />,
          title: t('Privacy Policy'),
        },
        {
          prefixIcon: <IMAGES.IcProfile color={'#3C3C3C'} />,
          title: t('Contact Us'),
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
          <Avatar
            source={{uri: authUser?.user?.photoURL ?? ''}}
            size={scale(130)}
          />
          <View style={{height: scale(20)}} />
          <Text>{authUser?.user?.displayName}</Text>
          <Text>
            Member since {moment(authUser?.user?.metadata?.creationTime).year()}
          </Text>
          <View style={{height: scale(20)}} />
        </View>

        <View style={{rowGap: scale(15)}}>
          {groupItems.map(item => {
            return (
              <FlatList
                ListHeaderComponentStyle={{marginBottom: scale(10)}}
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
                  <View style={{height: scale(10)}} />
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
export default ProfileIndexScreen;
