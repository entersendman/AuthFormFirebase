import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';

import {startApp} from '../../navigation';

class Initialization extends React.Component {
  async componentDidMount() {
    startApp()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Loading
        </Text>
      </View>
    )
  }
}

export default Initialization;

