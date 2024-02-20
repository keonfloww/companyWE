import {Screen} from '@navigation/navigation.enums';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import ProfileIndexScreen from './screens/ProfileIndexScreen';
import ProfileConnectedMailScreen from './screens/ProfileConnectedMailScreen';
import {t} from 'i18next';
import EditProfileScreen from './screens/EditProfileScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Colors} from 'react-native-ui-lib';
import IMAGES from '@assets/images/images';

const Stack = createNativeStackNavigator();

const ProfileScreen: FC<any> = ({navigation, route}) => {
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
          headerBackVisible: true,
          headerTintColor: Colors.text,
          headerTitleAlign: 'center',
          headerBackImageSource: IMAGES.icBackSrc,
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
          headerBackVisible: true,
          headerTintColor: Colors.text,
          headerTitleAlign: 'center',
          headerBackImageSource: IMAGES.icBackSrc,
        }}
        name={Screen.EditProfileScreen}
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default React.memo(ProfileScreen);
