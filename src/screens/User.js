import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, AsyncStorage, StyleSheet } from "react-native";
const jwtDecode = require('jwt-decode');

import ButtonOscar from '../components/ButtonOscar';
import api from '../services/api';
import Loading from '../components/Loading';

class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      loading: false
    }
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('userToken');
    let tokenDecoded = jwtDecode(token);
    api.defaults.headers.common['Authorization'] = token;
    const request = await api.get(`user/${tokenDecoded.sub}`);
    const { name, email } = request.data.result.user;

    this.setState({ name, email, loading: true });
  }

  signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {

    const { name, email } = this.state;

    return (
      <Fragment>
        {this.state.loading ?
          <View style={styles.container}>
            <ScrollView>
              <Text style={styles.textName}>{name}</Text>
              <Text style={styles.textEmail}>{email}</Text>
            </ScrollView>
            <ButtonOscar title='Sign me out' bg='white' colorText='black' method={this.signOut} />
          </View>
          : <Loading background='#040404' size='large' color='#FFCF00' />}
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
  textName: {
    color: '#ffffff',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: 'bold'
  },
  textEmail: {
    color: '#ffffff',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 10
  }
});

export default User;