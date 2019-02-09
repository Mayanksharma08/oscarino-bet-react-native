import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Text, FlatList, AsyncStorage, TouchableWithoutFeedback } from 'react-native';

import ButtonOscar from '../components/ButtonOscar';
import api from '../services/api';
import Loading from '../components/Loading';

class Group extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      groups: []
    }
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', payload => this.getGroups());
  }

  async getGroups() {
    const token = await AsyncStorage.getItem('userToken');
    api.defaults.headers.common['Authorization'] = token;
    const request = await api.get('me/groups');

    const groups = request.data.result;
    this.setState({ groups, loading: true });
  }

  render() {

    const { groups, loading } = this.state;

    return (
      <Fragment>
        {loading && groups.length == 0 ?
          <View style={styles.container}>
            <ButtonOscar title='Add Group' bg='white' colorText='black' method={() => this.props.navigation.navigate('FormGroup')} />
            <Text style={[styles.text, { fontSize: 14, alignSelf: 'center' }]}>You don't have any groups yet. Create one or be called.</Text>
          </View> :
          loading && groups.length != 0 ?
            <View style={styles.container}>
              <ButtonOscar title='Add Group' bg='white' colorText='black' method={() => this.props.navigation.navigate('FormGroup')} />
              <FlatList
                data={groups}
                renderItem={({ item }) => {
                  return (
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Group', item)} >
                      <View style={styles.item}>
                        <View>
                          <Text style={styles.text}>{item.name}</Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  )
                }}
                keyExtractor={(item) => item.toString()}
              />
            </View>
            : <Loading background='#040404' size='large' color='#FFCF00' />}
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040404'
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#040404',
    height: 50
  },
  text: {
    color: 'white',
    paddingLeft: 15,
    fontSize: 18
  }
});

export default Group;