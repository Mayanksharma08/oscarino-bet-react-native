import React from 'react';
import { View, AsyncStorage, StyleSheet } from "react-native";

import ButtonOscar from '../components/ButtonOscar';

const User = props => {

  signOut = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };

  return (
    <View style={styles.container}>
      <ButtonOscar title='Sign me out' bg='white' colorText='black' method={this.signOut} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#040404'
  }
});

export default User;