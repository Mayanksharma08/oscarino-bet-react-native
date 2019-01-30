import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Alert, AsyncStorage } from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken,
} = FBSDK;

import ButtonOscar from '../components/ButtonOscar';
import api from '../services/api';

const id = '1867060506705030';

export class Auth extends Component {

  static navigationOptions = {
    header: null
  }

  async loginFacebook() {
    let { isCancelled } = await LoginManager.logInWithReadPermissions(['public_profile']);

    if (!isCancelled) {
      let data = await AccessToken.getCurrentAccessToken();
      let token = data.accessToken.toString();
      await this.afterLoginComplete(token);
    }
    else {
      console.log('Login incomplete');
    }

  }

  afterLoginComplete = async (token) => {
    const responseLoginFacebook = await api.post('/facebook_login', { token });

    const tokenFacebook = 'Bearer ' + responseLoginFacebook.data.result.token;

    await AsyncStorage.setItem('userToken', tokenFacebook);
    this.props.navigation.navigate('App');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/oscar.png')}
          />
          <Text style={styles.title}>Welcome to the Oscar Bet</Text>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonOscar title='Login to Facebook' bg='#3b5998' colorText='white' method={() => this.loginFacebook()} />
          <ButtonOscar title='Sign up' bg='white' method={() => this.props.navigation.navigate('SignUp')} />
          <ButtonOscar title='Log in' bg='#FFCF00' method={() => this.props.navigation.navigate('Login')} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040404'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 150,
    height: 150
  },
  title: {
    color: 'white',
    marginTop: 10,
    width: 150,
    textAlign: 'center',
    opacity: 0.7
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100
  }
});

export default Auth;
