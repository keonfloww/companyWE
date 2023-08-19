import React, {RefObject} from 'react';
import {CommonActions, StackActions} from '@react-navigation/native';

/**
 * The navigation is implemented as a service so that it can be used outside of components, for example in sagas.
 *
 * @see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
 */

export const navigationRef: RefObject<any> = React.createRef();

function getCurrentRoute() {
  return navigationRef.current.getCurrentRoute().name;
}

function goBack() {
  navigationRef.current.dispatch(CommonActions.goBack());
}

function replace(routeName: string, params = {}) {
  navigationRef.current.dispatch(StackActions.replace(routeName, params));
}

function pop() {
  navigationRef.current.dispatch(StackActions.pop());
}

function popWithNStack(n: number) {
  navigationRef.current.dispatch(StackActions.pop(n));
}

/**
 * Call this function when you want to navigate to a specific route.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigate(routeName: string, params = {}, key: any = null) {
  // This key to handle resursion nagivate in same screen
  if (key) {
    navigationRef.current.dispatch(
      CommonActions.navigate({
        key: key,
        name: routeName,
        params,
      }),
    );

    return;
  }
  navigationRef.current.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
}

/**
 * Call this function when you want to navigate to a specific route AND reset the navigation history.
 *
 * That means the user cannot go back. This is useful for example to redirect from a splashscreen to
 * the main screen: the user should not be able to go back to the splashscreen.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigateAndReset(routeName: string, params = {}) {
  navigationRef.current.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: routeName,
          params,
        },
      ],
    }),
  );
}

export default {
  pop,
  popWithNStack,
  getCurrentRoute,
  goBack,
  navigate,
  replace,
  navigateAndReset,
};
