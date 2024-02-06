import {Screen} from '@navigation/navigation.enums';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FC} from 'react';
import ProfileIndexScreen from './screens/ProfileIndexScreen';
import ProfileConnectedMailScreen from './screens/ProfileConnectedMailScreen';
import {t} from 'i18next';

const Stack = createNativeStackNavigator();

const ProfileScreen: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screen.ProfileIndexScreen}
      screenOptions={{headerShown: false}}>
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
    </Stack.Navigator>
  );
};

export default ProfileScreen;