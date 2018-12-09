import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: '3%'
  },
  formWrapper: {
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: '5%',
    height: 350,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  formRow: {
    flexDirection: 'column',
  },
  formInput: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: '3%',
    width: '95%',
    alignSelf: 'flex-end'
  },
  inputLabel: {
    fontSize: 16,
  },
  createUserBtn: {
    backgroundColor: '#000',
    padding: '4%',
    alignSelf: 'flex-end',
    borderRadius: 10,
    marginTop: 15
  },
  createUserBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  error: {
    borderBottomColor: 'red',
  },
  errorMsg: {
    color: 'red',
    fontSize: 13
  }
})
