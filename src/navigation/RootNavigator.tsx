import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@screens/Home/HomeScreen';
import IntroScreen from '@screens/Intro/IntroScreen';
import React, {FC, PropsWithChildren, useEffect} from 'react';
import {Screen} from './navigation.enums';
import navigationService, {navigationRef} from '@services/navigationService';
import {t} from 'i18next';
import {Platform, Text, View, ActivityIndicator} from 'react-native';
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
import useAuthProvider from '@utils/hooks/useAuthProvider';
import LoginScreen from '@screens/Auth/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useInboxScreen from '@screens/Inbox/hooks/useInboxScreen';
import {Button, Colors} from 'react-native-ui-lib';
import SplashScreen from '@screens/Splash/SplashScreen';
import {LOCAL_STORAGE_KEYS} from '@utils/localStorageUtils';
import ProfileScreen from '@screens/Profile/ProfileScreen';
import {useSelector} from 'react-redux';
import {BaseState} from '@redux/stores';

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
  const {mailCountUnread, handleGetAllMailInConnectedMails} = useInboxScreen();
  useEffect(() => {
    handleGetAllMailInConnectedMails();
  }, []);

  // TODO: create hook for status bar on each screen style
  useEffect(() => {
    if (Platform.OS == 'android') {
      StatusBar.setBackgroundColor('white');
    }
    StatusBar.setBarStyle('dark-content');
  }, []);

  const styleHeader = () => {
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
  };
  {console.log(userState.connectedMails, userState.syncedMailAddress)}
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
        options={{
          ...styleHeader(),
          title: t('screen:inboxScreen'),
          ...(mailCountUnread
            ? {tabBarBadge: mailCountUnread}
            : {tabBarBadgeStyle: {display: 'none'}}),
          tabBarIcon: ({color}: any) =>
            userState.connectedMails.length === userState.syncedMailAddress.length ? (
              <TabBarIconWrapper>
                <IMAGES.IcInbox color={color} />
              </TabBarIconWrapper>
            ) : (
              <ActivityIndicator size="large" color="#50048A" />
            ),
        }}
      />
      <Tab.Screen
        name={Screen.SubscriptionScreen}
        component={FakeScreen}
        options={{
          ...styleHeader(),
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
  const {signOutFirebase} = useAuthProvider();
  const handleSignOut = async () => {
    try {
      global?.props?.showLoading();

      await signOutFirebase();
    } catch (error) {
      console.log('error handleSignOut', error);
    } finally {
      // Dont clear mail data on sign out anymore.
      // Because once user resign in with same credentials => keep data without sync
      // If the credentials is difference => remove and sync
      AsyncStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      navigationService.navigateAndReset(Screen.Login);
      global?.props?.hideLoading();
    }
  };

  return (
    <View>
      <Text style={{color: '#3c3c3c'}}>Fake screen</Text>
      <Button label={'Sign out'} onPress={handleSignOut} />
    </View>
  );
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
