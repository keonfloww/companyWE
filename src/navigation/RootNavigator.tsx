import IMAGES from '@assets/images/images';
import EmptyContent from '@components/atoms/EmptyDataText/EmptyDataText';
import BaseBookmarkSearchActions from '@components/atoms/HeaderActions/BaseBookmarkSearchActions';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CommonStyles from '@screens/styles';
import navigationService, {navigationRef} from '@services/navigationService';
import FocusAwareStatusBar from '@services/statusBarService';
import {scale} from '@utils/mixins';
import {t} from 'i18next';
import React, {FC, PropsWithChildren, useMemo} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {Colors} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';
import {Screen} from './navigation.enums';
import FormScreen from '@screens/Form';
import {colors} from 'src/themes';
import HomeScreenNavigator from './HomeNavigator';
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
      // initialRouteName={Screen.SplashScreen}
      // initialRouteName={Screen.StoryBookScreen}
      >
        <Stack.Group>
          <Stack.Screen
            name={Screen.MainTabBar}
            component={TabBarNavigator}
            options={{
              headerTitle: '',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Screen.FormScreen}
            component={FormScreen}
            options={{
              headerShown: true,
              headerShadowVisible: false,
              headerTitle: '도도익산',
              headerStyle: {
                backgroundColor: colors.underlayColor,
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigationService.goBack();
                  }}>
                  <IMAGES.icBack color={colors.black} />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    // navigationService.goBack();
                  }}>
                  <IMAGES.icMoreOptions color={colors.black} />
                </TouchableOpacity>
              ),
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
        tabBarActiveTintColor: colors.appColor,
        tabBarAllowFontScaling: true,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopEndRadius: scale(12),
          borderTopStartRadius: scale(12),
        },
        tabBarLabelStyle: {
          marginBottom: scale(3),
        },
      }}>
      <Tab.Screen
        name={Screen.HomeScreenNavigator}
        component={HomeScreenNavigator}
        options={{
          title: t('홈'),
          headerShown: false,
          tabBarIcon: ({color}: any) => {
            return (
              <TabBarIconWrapper>
                <Image source={IMAGES.icBottomHome} tintColor={color} />
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
            title: t('리스트'),
            tabBarIcon: ({color}: any) => (
              <TabBarIconWrapper>
                <Image source={IMAGES.icBottomNote} tintColor={color} />
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
            title: t('점검요청'),
            tabBarIcon: ({color}: any) => (
              <TabBarIconWrapper>
                <Image source={IMAGES.icBottomShield} tintColor={color} />
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
          title: t('점검이력'),
          headerTitleStyle: styles.bottomTabTitle,
          tabBarIcon: ({color}: any) => (
            <TabBarIconWrapper>
              <Image source={IMAGES.icBottomCalendar} tintColor={color} />
            </TabBarIconWrapper>
          ),
        }}
      />
      <Tab.Screen
        name={Screen.ConnectMailScreen}
        component={FakeScreen}
        options={{
          headerShown: false,
          title: t('더보기'),
          headerTitleStyle: styles.bottomTabTitle,
          tabBarIcon: ({color}: any) => (
            <TabBarIconWrapper>
              <Image source={IMAGES.icBottomMore} tintColor={color} />
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
