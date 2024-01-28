import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, useTheme} from '@rneui/themed';
import HomeScreen from '@screens/Home/HomeScreen';
import IntroScreen from '@screens/Intro/IntroScreen';
import React, {FC, useCallback, useEffect, useState} from 'react';
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
import BootSplash from 'react-native-bootsplash';
import StoryBookScreen from '@screens/StoryBook/StoryBookScreen';
import InboxScreen from '@screens/Inbox/InboxScreen';
import BaseBookmarkSearchActions from '@components/atoms/HeaderActions/BaseBookmarkSearchActions';
import ConnectMailScreen from '@screens/ConnectMail/ConnectMailScreen';
import useUserViewModel from '@redux/hooks/useUserViewModel';
import auth from '@react-native-firebase/auth';
import {BaseState} from '@redux/stores';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '@redux/slices/user.slice';
import useAuthProvider from '@utils/hooks/useAuthProvider';
import LoginScreen from '@screens/Auth/LoginScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CONFIG = {};

const RootNavigator: FC = () => {
  const {theme} = useTheme();
  const [initialScreen, setInitialScreen] = useState(Screen.IntroScreen);
  const {isEmptyConnectedMails} = useUserViewModel();
  // TODO: Need to use insets to handle status bar
  // const insets = useSafeAreaInsets();

  const linking = {
    prefixes: ['reactnative://'],
    CONFIG,
  };

  useEffect(() => {
    // if (isEmptyConnectedMails) {
    //   global?.props?.showLoading();
    //   setTimeout(() => {
    //     navigationService.navigateAndReset(Screen.ConnectMailScreen);
    //     global?.props?.hideLoading();
    //   }, 1000);
    // }
  }, [isEmptyConnectedMails]);

  useEffect(() => {
    const firebaseAuth = auth()!.currentUser;
    if (firebaseAuth?.uid) {
      setInitialScreen(Screen.ConnectMailScreen);
    }
    console.log(firebaseAuth?.uid);
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
        initialRouteName={initialScreen}
        // initialRouteName={Screen.StoryBookScreen}
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
  const {theme} = useTheme();

  // TODO: create hook for status bar on each screen style
  useEffect(() => {
    StatusBar.setBackgroundColor('white');
    StatusBar.setBarStyle('dark-content');
  }, [theme]);

  const styleHeader = () => {
    return {
      headerStyle: {
        backgroundColor: '#50048A',
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
        component={InboxScreen}
        options={{
          ...styleHeader(),
          title: t('screen:inboxScreen'),
          tabBarBadge: 3,
          tabBarIcon: ({color}) => <IMAGES.IcInbox color={color} />,
        }}
      />
      <Tab.Screen
        name={Screen.SubscriptionScreen}
        component={FakeScreen}
        options={{
          ...styleHeader(),
          title: t('screen:subscriptionScreen'),
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
  const {signOut} = useAuthProvider();
  const dispatch = useDispatch();

  const signOutt = () => {
    signOut().then(()=> {
      dispatch(setUser(null));
      navigationService.navigateAndReset(Screen.Login);
    });
  } 

  return (
    <View>
      <Text>Fake screen</Text>
      <Button title={'Sign out'} onPress={signOutt} />
    </View>
  );
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
