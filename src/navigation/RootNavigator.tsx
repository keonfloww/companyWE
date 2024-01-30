import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '@rneui/themed';
import HomeScreen from '@screens/Home/HomeScreen';
import IntroScreen from '@screens/Intro/IntroScreen';
import React, {FC, PropsWithChildren, useEffect} from 'react';
import {Screen} from './navigation.enums';
// import HeaderBackgroundDefault from '@layouts/default/HeaderBackgroundDefault';
import navigationService, {navigationRef} from '@services/navigationService';
import {t} from 'i18next';
import {Platform, Text, View} from 'react-native';
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
import {setUser, userSliceActions} from '@redux/slices/user.slice';
import useAuthProvider from '@utils/hooks/useAuthProvider';
import LoginScreen from '@screens/Auth/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useInboxScreen from '@screens/Inbox/hooks/useInboxScreen';
import {Button, Colors} from 'react-native-ui-lib';
import firestore from '@react-native-firebase/firestore';
import {FireStoreCollection} from '@services/firestoreService';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CONFIG = {};

const RootNavigator: FC = () => {
  let initialScreen = Screen.IntroScreen;
  const {isEmptyConnectedMails} = useUserViewModel();
  const connectedMails = useSelector(
    (state: BaseState) => state?.userReducer.connectedMails,
  );
  // TODO: Need to use insets to handle status bar
  // const insets = useSafeAreaInsets();

  const linking = {
    prefixes: ['reactnative://'],
    CONFIG,
  };

  const checkAuth = async () => {
    const user = await AsyncStorage.getItem('user');
    const firebaseAuth = auth()!.currentUser;

    if (firebaseAuth?.uid && user) {
      if (!connectedMails.length || isEmptyConnectedMails) {
        navigationService.navigateAndReset(Screen.ConnectMailScreen);
      } else {
        navigationService.navigateAndReset(Screen.MainTabBar);
      }
    }
    setTimeout(() => {
      BootSplash.hide({fade: true});
    }, 500);
  };

  return (
    <NavigationContainer
      onReady={checkAuth}
      ref={navigationRef}
      linking={linking}>
      <Stack.Navigator
        initialRouteName={initialScreen}
        // initialRouteName={Screen.StoryBookScreen}
        screenOptions={{
          fullScreenGestureEnabled: false,
          headerBackVisible: true,
          // headerBackground: HeaderBackgroundDefault,
          headerStyle: {
            backgroundColor: Colors.primary,
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
          tabBarIcon: ({color}) => {
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
          tabBarBadge: mailCountUnread,
          tabBarIcon: ({color}) => (
            <TabBarIconWrapper>
              <IMAGES.IcInbox color={color} />
            </TabBarIconWrapper>
          ),
        }}
      />
      <Tab.Screen
        name={Screen.SubscriptionScreen}
        component={FakeScreen}
        options={{
          ...styleHeader(),
          title: t('screen:subscriptionScreen'),
          tabBarIcon: ({color}) => (
            <TabBarIconWrapper>
              <IMAGES.IcStar color={color} fill={color} />
            </TabBarIconWrapper>
          ),
        }}
      />
      <Tab.Screen
        name={Screen.ProfileScreen}
        component={FakeScreen}
        options={{
          title: t('screen:ProfileScreen'),
          headerTitleStyle: styles.bottomTabTitle,
          tabBarIcon: ({color}) => (
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
  const {signOut} = useAuthProvider();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const firebaseAuth = auth()!.currentUser;
      await firestore()
        .collection(FireStoreCollection.MAIL)
        .doc(firebaseAuth!.uid)
        .delete();
      await signOut();
      dispatch(userSliceActions.signOut());
      AsyncStorage.removeItem('user');
      navigationService.navigateAndReset(Screen.Login);
    } catch (error) {
      console.log('error handleSignOut');
    }
  };

  return (
    <View>
      <Text>Fake screen</Text>
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
