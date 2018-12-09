import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import firebase from 'firebase';
import styles from './styles';
import {mergeStyles} from '../../utils';
import Button from '../../components/Button';
import * as PAGES from '../../constants/pages';

class Signin extends Component {
  state = {
    phoneNumber: '',
    password: '',
    isPhoneEmpty: true,
    isPasswordCorrect: true,
    errorMsg: ''
  };

  phoneNumberHandler = (num) => {
    this.setState({
      phoneNumber: num
    })
  };

  passwordHandler = (pass) => {
    this.setState({
      password: pass
    })
  };

  signInHandler = () => {
    const {phoneNumber, password} = this.state;
    const user = {
      phoneNumber: phoneNumber,
      password: password
    };
    if(phoneNumber.length){
    firebase.database().ref('/users')
      .once('value', data => {
      if(data.toJSON() !== null){
        const convertedToArray = Object.keys(data.toJSON())
          .map(key => data.toJSON()[key]);
        const findedUser = convertedToArray
          .filter((currentUser) =>
            currentUser.phoneNumber === user.phoneNumber
          );

        if(!findedUser.length) {
          this.setState({
            errorMsg: 'Such user not found'
          })
        } else {
          findedUser[0].password === user.password ?
            this.setState({
              isPasswordCorrect: true
            }, () => this.successLogin(phoneNumber))
            :
            this.setState({
              errorMsg: 'Incorrect password'
            })
        }
      } else {
        this.setState({
          errorMsg: 'No users found'
        })
      }
    });
    }
  };

  successLogin = (phoneNumber) => {
      Navigation.push(this.props.componentId, {
        component: {
          name: PAGES.MAIN,
          passProps: {
            phoneNumber
          },
          options: {
            bottomTabs: {
              visible: false
            }
          }
        }
      });
  };

  goToSignUpHandler = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: PAGES.SIGN_UP,
      }
    });
  };

  render() {
    const {
      phoneNumber,
      password,
      isPhoneEmpty,
      isPasswordCorrect,
      errorMsg
    } = this.state;

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentWrapper}>
          <View style={styles.formWrapper}>
            <View style={styles.formRow}>
              <Text style={styles.inputLabel}>
                Enter your phone number:
              </Text>
              <TextInput
                style={mergeStyles([
                  [styles.formInput],
                  [styles.error, isPhoneEmpty]
                ])}
                textContentType='telephoneNumber'
                enablesReturnKeyAutomatically
                returnKeyType='done'
                value={phoneNumber}
                onBlur={
                  () => phoneNumber.length ?
                    this.setState({isPhoneEmpty: !isPhoneEmpty})
                    :
                    null
                }
                onChangeText={(num) => this.phoneNumberHandler(num)}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.inputLabel}>
                Enter your password:
              </Text>
              <TextInput
                style={mergeStyles([
                  [styles.formInput],
                  [styles.error, !isPasswordCorrect]
                ])}
                secureTextEntry
                value={password}
                onChangeText={(pass) => this.passwordHandler(pass)}
              />
            </View>
            <Button
              buttonStyle={styles.createUserBtn}
              handler={this.signInHandler}
            >
              <Text style={styles.createUserBtnText}>
                Sign In
              </Text>
            </Button>
            <Button
              buttonStyle={styles.createUserBtn}
              handler={this.goToSignUpHandler}
            >
              <Text style={styles.createUserBtnText}>
                Create an account
              </Text>
            </Button>
            {
              !!errorMsg && (
                <View style={styles.errorMsgWrapper}>
                  <Text style={styles.errorMsg}>
                    {errorMsg}
                  </Text>
                </View>
              )
            }
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Signin;
