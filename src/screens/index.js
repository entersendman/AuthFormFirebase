import React from 'react';
import * as PAGES from '../constants/pages';
import {Navigation} from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent(
    PAGES.SIGN_UP,
    () => require('./Signup').default
  );

  Navigation.registerComponent(
    PAGES.INITIALIZATION,
    () => require('./Initialization').default
  );

  Navigation.registerComponent(
    PAGES.SIGN_IN,
    () => require('./Signin').default
  );

  Navigation.registerComponent(
    PAGES.MAIN,
    () => require('./Main').default
  );
}
