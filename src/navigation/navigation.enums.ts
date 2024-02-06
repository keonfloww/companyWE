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
  InboxScreen = 'InboxScreen',
  SubscriptionScreen = 'SubscriptionScreen',
  ProfileScreen = 'ProfileScreen',

  //Profile
  ProfileIndexScreen = 'ProfileIndexScreen',
  ProfileConnectedMailScreen = 'ProfileConnectedMailScreen',

  //
  ContactListScreen = 'HOME_ContactListScreen',
  ContactDetailScreen = 'HOME_ContactDetailScreen',
  ContactCreateScreen = 'HOME_ContactCreateScreen',
}

export type RootStackParamList = {
  HomeScreen: undefined;
  NotFound: undefined;

  ContactListScreen: undefined;
  ContactDetailScreen: {
    userId: number;
    screenTitle: string;
    isCreate?: boolean;
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
