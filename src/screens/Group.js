import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage, FlatList, TouchableHighlight, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const jwtDecode = require('jwt-decode');

import api from '../services/api';
import Loading from '../components/Loading';
import ButtonOscar from '../components/ButtonOscar';

take = '';

class Group extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
      myId: ''
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`,
    headerRight: (
      <>
        <TouchableHighlight onPress={() => navigation.navigate('FormGroup', navigation.state.params)}>
          <Icon name='pencil' color='white' size={26} style={{ paddingRight: 25 }} />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => take.deleteGroup(navigation.state.params.id)}>
          <Icon name='trash' color='white' size={26} style={{ paddingRight: 15 }} />
        </TouchableHighlight>
      </>
    ),
  });

  async componentDidMount() {
    this.props.navigation.addListener('willFocus', payload => this.getGroup());
  }

  async getGroup() {
    const idGroup = this.props.navigation.state.params.id;

    const token = await AsyncStorage.getItem('userToken');
    let tokenDecoded = jwtDecode(token);
    this.setState({ myId: tokenDecoded.sub });
    api.defaults.headers.common['Authorization'] = token;
    const request = await api.get(`group/${idGroup}`);

    const users = request.data.result.users;
    this.setState({ users, loading: true });
  }

  deleteGroup(idGroup) {
    Alert.alert(
      'Alert',
      "Are you sure you want delete this group?",
      [
        { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => this.confirmDeleteGroup(idGroup) },
      ],
      { cancelable: false },
    );
  }

  async confirmDeleteGroup(idGroup) {
    try {
      const token = await AsyncStorage.getItem('userToken');
      api.defaults.headers.common['Authorization'] = token;
      await api.delete(`group/${idGroup}`);
      this.props.navigation.navigate('Groups');
    } catch (e) {
      Alert.alert('Ops :(', 'Some error occurred');
      return;
    }
  }

  deleteMember(item) {
    Alert.alert(
      'Alert',
      `Are you sure you want to remove ${item.name} from the group?`,
      [
        { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => this.confirmDeleteMember(item.id) },
      ],
      { cancelable: false },
    );
  }


  async confirmDeleteMember(idMember) {
    const idGroup = this.props.navigation.state.params.id;

    const token = await AsyncStorage.getItem('userToken');
    api.defaults.headers.common['Authorization'] = token;
    try {
      await api.delete(`/group/${idGroup}/delete/${idMember}`);
      this.getGroup();
    } catch (e) {
      Alert.alert('Ops :(', 'An error occurred.');
    }
  }

  render() {

    take = this;

    const { users, loading, myId } = this.state;

    return (
      <>
        {loading ?
          <View style={styles.container}>
            <ButtonOscar title='Add Member' bg='white' colorText='black' method={() => this.props.navigation.navigate('AddMember', this.props.navigation.state.params)} />
            <Text style={styles.members}>Members:</Text>
            <FlatList
              data={users}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.item, { paddingLeft: 15 }]}>{`${index + 1} - `}</Text>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('UserShow', item)}>
                      <Text style={styles.item}>{item.name}</Text>
                    </TouchableHighlight>
                    {myId != item.id ?
                      <TouchableHighlight onPress={() => this.deleteMember(item)}>
                        <Icon name='trash' color='#D8002C' size={20} style={{ paddingLeft: 10 }} />
                      </TouchableHighlight>
                      : null}
                  </View>
                )
              }}
              keyExtractor={(item) => item.toString()}
            />
          </View>
          : <Loading background='#040404' size='large' color='#FFCF00' />}
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040404"
  },
  members: {
    color: 'white',
    fontSize: 18,
    paddingLeft: 15,
    marginBottom: 10
  },
  item: {
    color: "white",
    fontSize: 15,
    marginBottom: 3
  }
});

export default Group;