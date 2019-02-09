import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage, FlatList } from 'react-native';

import Images from '../assets';
import Loading from '../components/Loading'
import api from '../services/api';
import reducerString from '../utils/reducerString';

class Bets extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bets: [],
      refreshing: false,
      loading: false
    }
  }

  async componentDidMount() {
    this.props.navigation.addListener('willFocus', payload => this.getBets());
  }

  getBets = async () => {
    const token = await AsyncStorage.getItem('userToken');
    api.defaults.headers.common['Authorization'] = token;
    const request = await api.get('me/bets');

    const bets = request.data.result;
    this.setState({ bets, refreshing: false, loading: true });
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.getBets()
    })
  }

  ListEmpty = () => {
    return (
      <View>
        <Text style={styles.messageNotFound}>No Bets Found.</Text>
        <Text style={styles.messageNotFound}>Go to home screen and bet at the first time.</Text>
      </View>
    );
  };

  render() {
    return (
      <Fragment>
        {!this.state.loading && <Loading background='#040404' size='large' color='#FFCF00' />}
        <FlatList
          style={styles.container}
          data={this.state.bets}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.item}>
              {!item.feature.favorite ?
                <Text style={styles.titleCategorie}>{reducerString(item.name, 15)}</Text> :
                <Text style={[styles.titleCategorie, { color: '#FFCF00' }]}>{reducerString(item.name, 15)}</Text>
              }
              {!item.feature.favorite ?
                <Image style={styles.imageMovie} source={Images[item.feature.path]} /> :
                <Image style={[styles.imageMovie, { borderWidth: 2, borderColor: '#FFCF00' }]} source={Images[item.feature.path]} />
              }
            </View>
          )}
          ListEmptyComponent={this.state.loading ? this.ListEmpty : null}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#040404',
  },
  messageNotFound: {
    color: '#fff',
    textAlign: 'center'
  },
  item: {
    alignItems: "center",
    flexGrow: 1,
    padding: 10
  },
  titleCategorie: {
    paddingBottom: 15,
    paddingTop: 15,
    color: 'white',
    fontWeight: 'bold'
  },
  imageMovie: {
    marginRight: 10,
    width: 120,
    height: 180
  }
});

export default Bets;