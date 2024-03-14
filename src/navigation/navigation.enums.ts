import {Email} from '@models/mail/modelMail';

export enum Screen {
  StoryBookScreen = 'StoryBookScreen',

  SplashScreen = 'SplashScreen',

  IntroScreen = 'IntroScreen',
  IntroScreenTwo = 'IntroScreenTwo',
  IntroScreenThree = 'IntroScreenThree',

  ConnectMailScreen = 'ConnectMailScreen',
  // Auth
  Auth = 'Auth',
  Login = 'Login',

  MainTabBar = 'MainTabBar',
  HomeScreen = 'HomeScreen',
  HomeScreenNavigator = 'HomeScreenNavigator',

  InboxScreen = 'InboxScreen',
  InboxIndexScreen = 'InboxIndexScreen',
  InboxDetailScreen = 'InboxDetailScreen',

  SubscriptionScreen = 'SubscriptionScreen',
  ProfileScreen = 'ProfileScreen',

  //Profile
  ProfileIndexScreen = 'ProfileIndexScreen',
  ProfileConnectedMailScreen = 'ProfileConnectedMailScreen',
  EditProfileScreen = 'EditProfileScreen',

  // Global
  SearchScreen = 'SearchScreen',
  FormScreen = 'FormScreen',
  CompanyDetailScreen = 'CompanyDetailScreen',
  SettingScreen = 'SettingScreen',
}

export type RootStackParamList = {
  HomeScreen: undefined;
  NotFound: undefined;
  Auth: {isShowBack?: boolean};

  InboxDetailScreen: {
    item: Email;
  };
  // Feed: {sort: 'latest' | 'top'} | undefined;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
