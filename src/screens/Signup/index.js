import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import firebase from 'firebase';
import styles from './styles';
import * as PAGES from '../../constants/pages';
import Button from '../../components/Button';
import {mergeStyles} from '../../utils';

class Signup extends Component {

  state = {
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    isPasswordCorrect: false,
    isPhoneEmpty: true,
    isUserExist: false
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

  confirmPasswordHandler = (pass) => {
    this.setState({
      confirmPassword: pass
    })
  };

  createUserHandler = () => {
    const {
      phoneNumber,
      password,
      confirmPassword,
      isUserExist
    } = this.state;

    let userId = new Date();
    const user = {
      phoneNumber: phoneNumber,
      password: password,
      confirmPassword: confirmPassword,
    };
    const isPasswordCorrect = user.password === user.confirmPassword;
    firebase.database().ref('/users').once('value', (data) => {
      if (data.toJSON() !== null) {
        const newData = data.toJSON();
        const convertObjToArr = Object.keys(newData).map(key => newData[key]);
        const isUserExist = convertObjToArr
          .some((user) => user.phoneNumber === phoneNumber);
        this.setState({
          isUserExist: isUserExist
        }, () => this.postUserToDB(user, isUserExist, userId, isPasswordCorrect));
      } else {
        this.postUserToDB(user, isUserExist, userId, isPasswordCorrect)
      }
    });
  };

  postUserToDB = (user, isUserExist, userId, isPasswordCorrect) => {
    const {
      phoneNumber,
    } = this.state;
    if(!isUserExist && user.phoneNumber && isPasswordCorrect){
      this.setState({
        isPasswordCorrect: isPasswordCorrect
      });

      firebase.database().ref(`/users/${userId}`).set(user)
        .then(() => {
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
        })
        .catch(err => console.log(err))
    }
  };

  render() {
    const {
      phoneNumber,
      password,
      confirmPassword,
      isPasswordCorrect,
      isPhoneEmpty,
      isUserExist
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
            <View style={styles.formRow}>
              <Text style={styles.inputLabel}>
                Confirm password:
              </Text>
              <TextInput
                style={mergeStyles([
                  [styles.formInput],
                  [styles.error, !isPasswordCorrect]
                ])}
                secureTextEntry
                value={confirmPassword}
                onChangeText={(pass) => this.confirmPasswordHandler(pass)}
              />
            </View>
            <Button
              buttonStyle={styles.createUserBtn}
              handler={this.createUserHandler}
            >
              <Text style={styles.createUserBtnText}>
                Create User
              </Text>
            </Button>
            {
              isUserExist && (
                <View style={styles.errorMsgWrapper}>
                  <Text style={styles.errorMsg}>
                    Such user already exist!
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

export default Signup;
