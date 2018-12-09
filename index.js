import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/screens';
import * as PAGES from './src/constants/pages';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBFTXl6HVSytxP8y0yPzUsiREbSg_YLniE",
  authDomain: "reactnativedatabase-cd8ad.firebaseapp.com",
  databaseURL: "https://reactnativedatabase-cd8ad.firebaseio.com",
  projectId: "reactnativedatabase-cd8ad",
  storageBucket: "reactnativedatabase-cd8ad.appspot.com",
  messagingSenderId: "307263765647"
};
firebase.initializeApp(config);

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: PAGES.INITIALIZATION
      }
    },
  });
});
