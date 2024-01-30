import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '@rneui/themed';
import HomeScreen from '@screens/Home/HomeScreen';
import IntroScreen from '@screens/Intro/IntroScreen';
import React, {FC, useEffect} from 'react';
import {Screen} from './navigation.enums';
// import HeaderBackgroundDefault from '@layouts/default/HeaderBackgroundDefault';
import navigationService, {navigationRef} from '@services/navigationService';
import {t} from 'i18next';
import {Text, View} from 'react-native';
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
import useInboxScreen from '@screens/Inbox/hooks/useInboxScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CONFIG = {};

const RootNavigator: FC = () => {
  const {theme} = useTheme();

  const {isEmptyConnectedMails} = useUserViewModel();

  // TODO: Need to use insets to handle status bar
  // const insets = useSafeAreaInsets();

  const linking = {
    prefixes: ['reactnative://'],
    CONFIG,
  };

  useEffect(() => {
    if (isEmptyConnectedMails) {
      global?.props?.showLoading();
      setTimeout(() => {
        navigationService.navigateAndReset(Screen.ConnectMailScreen);
        global?.props?.hideLoading();
      }, 1000);
    }
  }, [isEmptyConnectedMails]);

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
            name={Screen.StoryBookScreen}
            component={StoryBookScreen}
            options={{title: t('Project Story Book'), headerShown: true}}
          />
          <Stack.Screen
            name={Screen.IntroScreen}
            component={IntroScreen}
            options={{title: t('screen:intro'), headerShown: false}}
          />
          <Stack.Screen
            name={Screen.ConnectMailScreen}
            component={ConnectMailScreen}
            options={{headerShown: false}}
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

  const {mailCountUnread} = useInboxScreen();

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
          tabBarBadge: mailCountUnread,
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
  headerScreenTitle: {
    fontSize: CommonStyles.fontSize.size30,
    fontFamily: CommonStyles.fontFamily.medium,
  },
});
