import React from 'react';
import {Navigation} from 'react-native-navigation';
import * as PAGES from './constants/pages';

Navigation.setDefaultOptions({
  topBar: {
    visible: false,
  },
  bottomTabs: {}
});

export const startApp = async () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: PAGES.SIGN_UP,
                  },
                }
              ],
              options: {
                bottomTab: {
                  text: 'SignUp',
                }
              }
            }
          },

          {
            stack: {
              children: [
                {
                  component: {
                    name: PAGES.SIGN_IN,
                  },
                }
              ],
              options: {
                bottomTab: {
                  text: 'SignIn',
                }
              }
            }
          },
        ],
      }
    }
  });
};

