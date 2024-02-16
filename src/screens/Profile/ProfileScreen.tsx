import {Screen} from '@navigation/navigation.enums';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import ProfileIndexScreen from './screens/ProfileIndexScreen';
import ProfileConnectedMailScreen from './screens/ProfileConnectedMailScreen';
import {t} from 'i18next';
import EditProfileScreen from './screens/EditProfileScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import IMAGES from '@assets/images/images';
import {Colors} from 'react-native-ui-lib';
import {ImageStore} from 'react-native';
import CommonStyles from '@screens/styles';
import {scale} from '@utils/mixins';

const Stack = createNativeStackNavigator();

const ProfileScreen: FC = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === Screen.EditProfileScreen) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator
      initialRouteName={Screen.ProfileIndexScreen}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Screen.ProfileIndexScreen}
        component={ProfileIndexScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackTitle: '',
          title: t('screen:profileConnectedMail'),
          headerBackTitleVisible: false,
        }}
        name={Screen.ProfileConnectedMailScreen}
        component={ProfileConnectedMailScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackTitle: '',
          title: t('Your Profile'),
          headerBackTitleVisible: false,
          headerTintColor: Colors.text,
          headerLeft: props => {
            return (
              <IMAGES.icBack
                {...props}
                {...CommonStyles.icon.icon24}
                style={{marginLeft: scale(5)}}
              />
            );
          },
        }}
        name={Screen.EditProfileScreen}
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default React.memo(ProfileScreen);
