import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@screens/Home/HomeScreen';
import IntroScreen from '@screens/Intro/IntroScreen';
import React, {FC, PropsWithChildren, useEffect, useMemo} from 'react';
import {Screen} from './navigation.enums';
import navigationService, {navigationRef} from '@services/navigationService';
import {t} from 'i18next';
import {Platform, StatusBar, View, useWindowDimensions} from 'react-native';
import IMAGES from '@assets/images/images';
import CommonStyles from '@screens/styles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {scale} from '@utils/mixins';
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
import ProgressCircle from './components/ProgressCircle';
import EmptyContent from '@components/atoms/EmptyDataText/EmptyDataText';
import {useDispatch} from 'react-redux';
import {userSliceActions} from '@redux/slices/user.slice';
import InboxDetailScreen from '@screens/Inbox/screens/InboxDetailScreen';
import SearchScreen from '@screens/SearchScreen/SearchScreen';
import FocusAwareStatusBar from '@services/statusBarService';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CONFIG = {};

const RootNavigator: FC = () => {
  // TODO: Need to use insets to handle status bar
  // const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('Config.LOCAL_STORAGE_VERSION', Config.LOCAL_STORAGE_VERSION);
    // LocalUtils.shouldClearLocalStorageOnFirstTime({
    //   key: '1' ?? Config.LOCAL_STORAGE_VERSION ?? '1', // update it into env
    //   onYes: () => {
    // console.info('RECOGNIZED NEW APP INSTALL');
    // dispatch(userSliceActions.init());
    // dispatch(persistSliceActions.init());
    // AsyncStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    // navigationService.navigateAndReset(Screen.Login);
    // global?.props?.hideLoading();
    // console.clear();
    //   },
    // });
    dispatch(userSliceActions.connectedMailMarkSyncedAll());
  }, []);

  const linking = {
    prefixes: ['reactnative://'],
    CONFIG,
  };

  const screen = useWindowDimensions();
  // const headerLeftWidth = scale(10);
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
          <Stack.Screen
            name={Screen.SearchScreen}
            component={SearchScreen}
            options={{
              title: t('SearchScreen'),
              headerShown: false,
              // ...(Platform.OS == 'android' && {
              //   statusBarStyle: 'dark',
              //   statusBarColor: 'white',
              // }),
            }}
          />
          <Stack.Screen
            name={Screen.InboxDetailScreen}
            component={InboxDetailScreen}
            options={() => ({
              // ...(Platform.OS == 'android' && {statusBarStyle: 'dark'}),
              headerStyle: {
                backgroundColor: 'white',
              },
              headerShown: false,
            })}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name={Screen.MainTabBar}
            component={TabBarNavigator}
            options={{
              headerTitle: '',
              headerShown: false,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

const TabBarNavigator: FC = () => {
  const {userState, mailCountUnread} = useInboxScreen();
  // console.log('mailCountUnread', mailCountUnread);
  // TODO: create hook for status bar on each screen style
  // useEffect(() => {
  //   if (Platform.OS == 'android') {
  //     StatusBar.setBackgroundColor('white');
  //   }
  //   StatusBar.setBarStyle('dark-content');
  // }, []);

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
              navigationService.navigate(Screen.SearchScreen);
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

  const inBoxTabBarOptions = {
    ...styleHeader,
    title: t('screen:inboxScreen'),
    tabBarBadge: mailCountUnread,
    tabBarBadgeStyle: {display: mailCountUnread == 0 ? 'none' : 'flex'},
    tabBarIcon: ({color, focused}: any) =>
      userState.connectedMails.length === userState.syncedMailAddress.length ? (
        <TabBarIconWrapper>
          {focused ? (
            <IMAGES.IcInboxFilled color={color} />
          ) : (
            <IMAGES.IcInbox color={color} />
          )}
        </TabBarIconWrapper>
      ) : (
        <ProgressCircle />
      ),
  };

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
          // ...(Platform.OS == 'android' && {
          //   statusBarStyle: 'dark',
          //   statusBarColor: 'white',
          // }),
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
          // ...(Platform.OS == 'android' && {
          //   statusBarStyle: 'dark',
          //   statusBarColor: 'white',
          // }),
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
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FocusAwareStatusBar
        backgroundColor={'#50048A'}
        barStyle={'light-content'}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          flex: 1,
        }}>
        <EmptyContent content="" />
      </View>
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
