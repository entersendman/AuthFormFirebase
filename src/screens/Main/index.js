import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Navigation} from 'react-native-navigation';
import styles from './styles';
import Button from '../../components/Button';
import * as PAGES from '../../constants/pages';

class Main  extends Component {

  logOut = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: PAGES.SIGN_IN,
      }
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentWrapper}>
          <Text>
            {`Hello ${this.props.phoneNumber}`}
          </Text>
          <Button handler={this.logOut}>
            <Text>
              Log Out
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default Main ;
