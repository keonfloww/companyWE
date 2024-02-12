import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@screens/Home/HomeScreen';
import IntroScreen from '@screens/Intro/IntroScreen';
import React, {FC, PropsWithChildren, useEffect, useMemo} from 'react';
import {Screen} from './navigation.enums';
import {navigationRef} from '@services/navigationService';
import {t} from 'i18next';
import {Platform, View} from 'react-native';
import IMAGES from '@assets/images/images';
import CommonStyles from '@screens/styles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {scale} from '@utils/mixins';
import {StatusBar} from 'react-native';
import SignUpScreen from '@screens/Auth/SignUpScreen';
import StoryBookScreen from '@screens/StoryBook/StoryBookScreen';
import InboxScreen from '@screens/Inbox/InboxScreen';
import BaseBookmarkSearchActions from '@components/atoms/HeaderActions/BaseBookmarkSearchActions';
import ConnectMailScreen from '@screens/ConnectMail/ConnectMailScreen';
import LoginScreen from '@screens/Auth/LoginScreen';
import useInboxScreen from '@screens/Inbox/hooks/useInboxScreen';
import {Colors} from 'react-native-ui-lib';
import SplashScreen from '@screens/Splash/SplashScreen';
import ProfileScreen from '@screens/Profile/ProfileScreen';
import * as Progress from 'react-native-progress';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CONFIG = {};

const RootNavigator: FC = () => {
  // TODO: Need to use insets to handle status bar
  // const insets = useSafeAreaInsets();

  const linking = {
    prefixes: ['reactnative://'],
    CONFIG,
  };

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Stack.Navigator
        initialRouteName={Screen.SplashScreen}
        // initialRouteName={Screen.StoryBookScreen}
        screenOptions={{
          fullScreenGestureEnabled: false,
          headerBackVisible: true,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}>
        {/* Global */}

        <Stack.Group>
          <Stack.Screen
            name={Screen.SplashScreen}
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Screen.IntroScreen}
            component={IntroScreen}
            options={{title: t('screen:intro'), headerShown: false}}
          />
          <Stack.Screen
            name={Screen.Auth}
            component={SignUpScreen}
            options={{title: t('screen:auth'), headerShown: false}}
          />
          <Stack.Screen
            name={Screen.Login}
            component={LoginScreen}
            options={{title: t('screen:auth'), headerShown: false}}
          />
          <Stack.Screen
            name={Screen.ConnectMailScreen}
            component={ConnectMailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Screen.StoryBookScreen}
            component={StoryBookScreen}
            options={{title: t('Project Story Book'), headerShown: true}}
          />
        </Stack.Group>
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
  const {
    userState,
    mailCountUnread,

    handleGetAllMailInConnectedMails,
  } = useInboxScreen();
  useEffect(() => {
    handleGetAllMailInConnectedMails();
  }, [userState.user?.id]);

  // TODO: create hook for status bar on each screen style
  useEffect(() => {
    if (Platform.OS == 'android') {
      StatusBar.setBackgroundColor('white');
    }
    StatusBar.setBarStyle('dark-content');
  }, []);

  const styleHeader = useMemo(() => {
    return {
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerRight: () => {
        return (
          <BaseBookmarkSearchActions
            color="white"
            onPressBookMark={() => {
              console.log('onPressBookMark');
            }}
            onPressSearch={() => {
              console.log('onPressSearch');
            }}
          />
        );
      },
      headerRightContainerStyle: {
        paddingRight: scale(15),
      },
      headerTitleStyle: styles.headerScreenTitle,
      headerTitleAlign: 'left',
      headerTintColor: '#fff',
    };
  }, []);

  const inBoxTabBarOptions = useMemo(() => {
    return {
      ...styleHeader,
      title: t('screen:inboxScreen'),
      ...(mailCountUnread
        ? {tabBarBadge: mailCountUnread}
        : {tabBarBadgeStyle: {display: 'none'}}),
      tabBarIcon: ({color, focused}: any) =>
        userState.connectedMails.length ===
        userState.syncedMailAddress.length ? (
          <TabBarIconWrapper>
            {focused ? (
              <IMAGES.IcInboxFilled color={color} />
              ) : (
              <IMAGES.IcInbox color={color} />
            )}
          </TabBarIconWrapper>
        ) : (
          <Progress.Circle
            style={{borderRadius: 99}}
            size={scale(25)}
            strokeCap="round"
            endAngle={0.8}
            indeterminate={true}
            borderColor="#50048A"
            borderWidth={scale(5)}
          />
        ),
    };
  }, [
    styleHeader,
    mailCountUnread,
    userState.connectedMails,
    userState.syncedMailAddress,
  ]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarAllowFontScaling: true,
      }}>
      <Tab.Screen
        name={Screen.HomeScreen}
        component={HomeScreen}
        options={{
          title: t('screen:Home'),
          headerShown: false,
          tabBarIcon: ({color}: any) => {
            return (
              <TabBarIconWrapper>
                <IMAGES.IcHome color={color} fill={color} />
              </TabBarIconWrapper>
            );
          },
        }}
      />
      <Tab.Screen
        name={Screen.InboxScreen}
        component={InboxScreen}
        options={inBoxTabBarOptions}
      />
      <Tab.Screen
        name={Screen.SubscriptionScreen}
        component={FakeScreen}
        options={{
          ...styleHeader,
          title: t('screen:subscriptionScreen'),
          tabBarIcon: ({color}: any) => (
            <TabBarIconWrapper>
              <IMAGES.IcStar color={color} fill={color} />
            </TabBarIconWrapper>
          ),
        }}
      />
      <Tab.Screen
        name={Screen.ProfileScreen}
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: t('screen:ProfileScreen'),
          headerTitleStyle: styles.bottomTabTitle,
          tabBarIcon: ({color}: any) => (
            <TabBarIconWrapper>
              <IMAGES.IcProfile color={color} fill={color} />
            </TabBarIconWrapper>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const FakeScreen = () => {
  return <View></View>;
};

const TabBarIconWrapper: FC<PropsWithChildren> = ({children}) => {
  return <View style={{}}>{children}</View>;
};

const styles = StyleSheet.create({
  bottomTabTitle: {
    fontSize: CommonStyles.fontSize.size12,
    fontFamily: CommonStyles.fontFamily.regular,
    marginBottom: scale(15),
  },
  headerScreenTitle: {
    fontSize: CommonStyles.fontSize.size30,
    fontFamily: CommonStyles.fontFamily.medium,
  },
});
