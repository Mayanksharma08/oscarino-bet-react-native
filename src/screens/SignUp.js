import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, Alert, Linking, TouchableWithoutFeedback } from 'react-native';

import api from '../services/api';

export class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        password: ""
      }
    }
  }

  signUp = async () => {
    try {
      await api.post('/register', this.state.user);

      Alert.alert(
        'Congratz',
        'Register completed.',
        [
          { text: 'OK' },
        ],
        { cancelable: false }
      )

      this.props.navigation.navigate('Login');
    } catch (e) {
      Alert.alert(
        'Ops',
        'An error occurred in the registration, try again.',
        [
          { text: 'OK' },
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
      <KeyboardAvoidingView keyboardVerticalOffset={-500} behavior='padding' style={styles.container}>
        <TextInput
          textContentType='name'
          placeholder='user'
          placeholderTextColor='white'
          style={styles.input}
          onChange={(event) => this.textHandler(event.nativeEvent.text, 'name')}
          onSubmitEditing={() => this.emailInput.focus()}
          value={user.name} />
        <TextInput
          textContentType='emailAddress'
          keyboardType='email-address'
          autoCapitalize="none"
          placeholder='email'
          placeholderTextColor='white'
          ref={(input) => this.emailInput = input}
          onSubmitEditing={() => this.passwordInput.focus()}
          style={styles.input}
          onChange={(event) => this.textHandler(event.nativeEvent.text, 'email')}
          value={user.email} />
        <TextInput
          textContentType='password'
          placeholder='password'
          placeholderTextColor='white'
          ref={(input) => this.passwordInput = input}
          secureTextEntry
          style={[styles.input, styles.inputBottom]}
          onChange={(event) => this.textHandler(event.nativeEvent.text, 'password')}
          value={user.password} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonSignUp} onPress={this.signUp} >
            <Text style={styles.textSignUp}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback onPress={() => Linking.openURL("https://oscar-bet.blogspot.com/2019/01/politica-de-privacidade.html")}>
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By clicking Sign up you agree to our <Text style={{ textDecorationLine: 'underline' }}>Terms of Service</Text>.
          </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    height: 45,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    padding: 10,
    borderRadius: 50,
    paddingHorizontal: 15,
    marginBottom: 20
  },
  inputBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.5)'
  },
  buttonContainer: {
    marginTop: 20
  },
  termsContainer: {
    marginTop: 20
  },
  termsText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)'
  },
  buttonSignUp: {
    width: 200,
    height: 45,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50
  },
  textSignUp: {
    fontWeight: 'bold',
    fontSize: 16,
    fontWeight: 'bold',
    color: "#000"
  }
});

export default SignUp;
