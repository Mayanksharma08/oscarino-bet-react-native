import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native';

import api from '../services/api';
import Loading from '../components/Loading';

class FormGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      group: {
        name: ""
      }
    }
  }

  componentDidMount() {
    if (this.props.navigation.state.params) {
      this.getGroup();
    } else {
      this.setState({ loading: true });
    }
  }

  async getGroup() {
    const idGroup = this.props.navigation.state.params.id;

    const token = await AsyncStorage.getItem('userToken');
    api.defaults.headers.common['Authorization'] = token;
    const request = await api.get(`group/${idGroup}`);

    const group = request.data.result.group;
    this.setState({ group, loading: true });
  }

  textHandler = (text, name) => {

    let { group } = this.state;

    group[name] = text;

    this.setState({ group });
  }

  submit = async () => {
    this.setState({ loading: true });
    try {

      if (this.props.navigation.state.params) {
        const idGroup = this.props.navigation.state.params.id;
        await api.put(`group/${idGroup}`, this.state.group);
        Alert.alert(
          'Congratz :)',
          'Group updated successfully.',
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        );
      } else {
        await api.post('group', this.state.group);
        Alert.alert(
          'Congratz :)',
          'Group created successfully.',
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        );
      }
      this.props.navigation.navigate('Groups');

    } catch (e) {
      Alert.alert(
        'Ops',
        'An error occurred in the registration, try again.',
        [
          { text: 'OK' },
        ],
        { cancelable: false }
      );
    }
    this.setState({ loading: false });
  }

  render() {

    const { group, loading } = this.state;

    return (
      <>
        {loading ?
          <KeyboardAvoidingView keyboardVerticalOffset={-500} behavior='padding' style={styles.container}>
            <TextInput
              textContentType='name'
              placeholder='name'
              placeholderTextColor='white'
              placeholderStyle={{ marginLeft: 50 }}
              style={styles.input}
              onChange={(event) => this.textHandler(event.nativeEvent.text, 'name')}
              value={group.name} />

            <View>
              <TouchableOpacity style={styles.buttonSubmit} onPress={this.submit} >
                <Text style={styles.textSubmit}>Submit</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          : <Loading background='#040404' size='large' color='#FFCF00' />}
      </>
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
  buttonSubmit: {
    width: 200,
    height: 45,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50
  },
  textSubmit: {
    fontWeight: 'bold',
    fontSize: 16,
    color: "#000"
  }
});

export default FormGroup;