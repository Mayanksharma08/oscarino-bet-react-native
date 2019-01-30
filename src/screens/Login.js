import React, { Component, Fragment } from 'react';
import { Text, Alert, View, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';

import api from '../services/api';
import Loading from '../components/Loading';

export class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: {
        email: "",
        password: ""
      }
    }
  }

  logIn = async () => {
    try {
      this.setState({ loading: true });

      const response = await api.post('/login', this.state.user);

      let token = response.data.result.token;
      token = 'Bearer ' + token;

      await AsyncStorage.setItem('userToken', token);
      this.setState({ loading: false });
      this.props.navigation.navigate('App');
    } catch (e) {
      this.setState({ loading: false });
      Alert.alert(
        'Ops',
        'Email or password invalid, try again.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
      return;
    }
  }

  textHandler = (text, name) => {

    let { user } = this.state;

    user[name] = text;

    this.setState({ user });
  }

  render() {

    const { user } = this.state;

    return (
      <Fragment>
        {!this.state.loading ?
          <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <TextInput
              textContentType='emailAddress'
              placeholder='email'
              placeholderTextColor='white'
              returnKeyType='next'
              keyboardType='email-address'
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              onChange={(event) => this.textHandler(event.nativeEvent.text, 'email')}
              value={user.email}
              onSubmitEditing={() => this.passwordInput.focus()} />
            <TextInput
              textContentType='password'
              placeholder='password'
              placeholderTextColor='white'
              returnKeyType='go'
              secureTextEntry
              style={[styles.input, styles.inputBottom]}
              ref={(input) => this.passwordInput = input}
              onChange={(event) => this.textHandler(event.nativeEvent.text, 'password')}
              value={user.password} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonLogIn} onPress={this.logIn} >
                <Text style={styles.textLogIn}>Log in</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView> : <Loading background='#040404' size='large' color='#FFCF00' />}
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#040404'
  },
  input: {
    color: 'white',
    width: '50%',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.5)',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10
  },
  inputBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.5)'
  },
  buttonContainer: {
    marginTop: 20
  },
  buttonLogIn: {
    width: 200,
    height: 45,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    marginBottom: 20
  },
  textLogIn: {
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default Login;
