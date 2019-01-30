import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const ButtonOscar = props => (
  <TouchableOpacity style={[styles.button, {backgroundColor: props.bg}]} onPress={props.method} >
    <Text style={[styles.title, {color: props.colorText}]}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 45,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 50,
    padding: 10,
    marginBottom: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default ButtonOscar;