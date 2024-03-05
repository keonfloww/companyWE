import IMAGES from '@assets/images/images';
import EmptyContent from '@components/atoms/EmptyDataText/EmptyDataText';
import BaseBookmarkSearchActions from '@components/atoms/HeaderActions/BaseBookmarkSearchActions';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@screens/Auth/LoginScreen';
import SignUpScreen from '@screens/Auth/SignUpScreen';
import SplashScreen from '@screens/Splash/SplashScreen';
import StoryBookScreen from '@screens/StoryBook/StoryBookScreen';
import CommonStyles from '@screens/styles';
import navigationService, {navigationRef} from '@services/navigationService';
import FocusAwareStatusBar from '@services/statusBarService';
import {scale} from '@utils/mixins';
import {t} from 'i18next';
import React, {FC, PropsWithChildren, useMemo} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {Colors} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';
import {Screen} from './navigation.enums';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CONFIG = {};

const RootNavigator: FC = () => {
  // TODO: Need to use insets to handle status bar
  // const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

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

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarAllowFontScaling: true,
      }}>
      <Tab.Screen
        name={Screen.HomeScreen}
        component={FakeScreen}
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
        component={FakeScreen}
        options={
          {
            ...styleHeader,
            title: t('screen:InboxScreen'),
            tabBarIcon: ({color}: any) => (
              <TabBarIconWrapper>
                <IMAGES.IcStar color={color} fill={color} />
              </TabBarIconWrapper>
            ),
          } as any
        }
      />
      <Tab.Screen
        name={Screen.SubscriptionScreen}
        component={FakeScreen}
        options={
          {
            ...styleHeader,
            title: t('screen:subscriptionScreen'),
            tabBarIcon: ({color}: any) => (
              <TabBarIconWrapper>
                <IMAGES.IcStar color={color} fill={color} />
              </TabBarIconWrapper>
            ),
          } as any
        }
      />
      <Tab.Screen
        name={Screen.ProfileScreen}
        component={FakeScreen}
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
