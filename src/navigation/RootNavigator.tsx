import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '@rneui/themed';
import HomeScreen from '@screens/Home/HomeScreen';
import IntroScreen from '@screens/Intro/IntroScreen';
import React, {FC, PropsWithChildren, useCallback, useEffect} from 'react';
import {Screen} from './navigation.enums';
// import HeaderBackgroundDefault from '@layouts/default/HeaderBackgroundDefault';
import navigationService, {navigationRef} from '@services/navigationService';
import {t} from 'i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import IMAGES from '@assets/images/images';
import CommonStyles from '@screens/styles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {scale} from '@utils/mixins';
import {StatusBar} from 'react-native';
import SignUpScreen from '@screens/Auth/SignUpScreen';
import BootSplash from "react-native-bootsplash";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CONFIG = {};

const RootNavigator: FC = () => {
  const {theme} = useTheme();

  // TODO: Need to use insets to handle status bar
  // const insets = useSafeAreaInsets();

  const linking = {
    prefixes: ['reactnative://'],
    CONFIG,
  };

  const navigateToCreateContact = useCallback(() => {
    navigationService.navigate(
      Screen.ContactDetailScreen,
      {
        userId: null,
        userName: null,
        isCreate: true,
      },
      'ContactCreateScreen',
    );
  }, []);
  const pressContactAction = useCallback(() => {
    return (
      <TouchableOpacity onPress={navigateToCreateContact}>
        <FastImage
          style={CommonStyles.icon.icon35}
          source={IMAGES.icAddContact}
        />
      </TouchableOpacity>
    );
  }, []);

  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide({fade: true});
      }}
      ref={navigationRef}
      linking={linking}
      theme={{
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.white,
          text: theme.colors.black,
          border: theme.colors.black,
          notification: theme.colors.black,
        },
        dark: theme.mode === 'dark',
      }}>
      <Stack.Navigator
        initialRouteName={Screen.IntroScreen}
        screenOptions={{
          fullScreenGestureEnabled: false,
          headerBackVisible: true,
          // headerBackground: HeaderBackgroundDefault,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}>
        {/* Global */}
        <Stack.Group>
          <Stack.Screen
            name={Screen.IntroScreen}
            component={IntroScreen}
            options={{title: t('screen:intro'), headerShown: false}}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name={Screen.Auth}
            component={SignUpScreen}
            options={{title: t('screen:auth'), headerShown: false}}
          />
        </Stack.Group>

        {/* Private */}
        <Stack.Group>
          <Stack.Screen
            name={Screen.MainTabBar}
            component={TabBarNavigator}
            options={{
              headerTitle: 'Test',
              headerShown: false,
              // gestureEnabled: false,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

const TabBarNavigator: FC = () => {
  const {theme} = useTheme();

  // TODO: create hook for status bar on each screen style
  useEffect(() => {
    StatusBar.setBackgroundColor('white');
    StatusBar.setBarStyle('dark-content');
  }, [theme]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarAllowFontScaling: true,
        tabBarStyle: {height: scale(59)},
        tabBarLabelStyle: {marginBottom: scale(10)},
      }}>
      <Tab.Screen
        name={Screen.HomeScreen}
        component={HomeScreen}
        options={{
          title: t('screen:Home'),
          headerShown: false,
          tabBarIcon: ({color}) => {
            return <IMAGES.IcHome color={color} fill={color} />;
          },
        }}
      />
      <Tab.Screen
        name={Screen.InboxScreen}
        component={FakeScreen}
        options={{
          title: t('screen:InboxScreen'),
          tabBarBadge: 3,
          headerTitleStyle: styles.bottomTabTitle,
          tabBarIcon: ({color}) => <IMAGES.IcInbox color={color} />,
        }}
      />
      <Tab.Screen
        name={Screen.SubscriptionScreen}
        component={FakeScreen}
        options={{
          title: t('screen:SubscriptionScreen'),
          headerTitleStyle: styles.bottomTabTitle,
          tabBarIcon: ({color}) => <IMAGES.IcStar color={color} fill={color} />,
        }}
      />
      <Tab.Screen
        name={Screen.ProfileScreen}
        component={FakeScreen}
        options={{
          title: t('screen:ProfileScreen'),
          headerTitleStyle: styles.bottomTabTitle,
          tabBarIcon: ({color}) => (
            <IMAGES.IcProfile color={color} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const FakeScreen = () => {
  return (
    <View>
      <Text>Fake screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabTitle: {
    fontSize: CommonStyles.fontSize.size12,
    fontFamily: CommonStyles.fontFamily.regular,
    marginBottom: scale(15),
  },
});
