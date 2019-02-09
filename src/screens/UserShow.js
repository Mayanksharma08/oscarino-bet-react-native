import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

import Images from '../assets';
import api from '../services/api';
import Loading from '../components/Loading';
import reducerString from '../utils/reducerString';

class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bets: [],
      watches: [],
      loading: false
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`,
  });

  async componentDidMount() {
    const idUser = this.props.navigation.state.params.id;

    const request = await api.get(`user/${idUser}`);
    const { bets, watches } = request.data.result;

    this.setState({ loading: true, bets, watches });
  }

  ListEmpty = () => {
    return (
      <View>
        <Text style={styles.messageNotFound}>No data found.</Text>
      </View>
    );
  };

  render() {

    const { bets, watches, loading } = this.state;

    console.log(bets);

    return (
      <Fragment>
        {loading ?
          <View style={styles.container}>
            <Text style={styles.title}>Bets:</Text>
            <FlatList
              horizontal
              style={styles.list}
              data={bets}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.titleCategorie}>{reducerString(item.name, 10)}</Text>
                  <Image style={styles.imageMovie} source={Images[item.feature.path]} />
                </View>
              )}
              ListEmptyComponent={loading ? this.ListEmpty : null}
              keyExtractor={index => index.toString()} />
            <Text style={styles.title}>Watched Movies:</Text>
            <FlatList
              style={styles.list}
              horizontal
              data={watches}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.titleCategorie}>{reducerString(item.feature.name, 10)}</Text>
                  <Image style={styles.imageMovie} source={Images[item.feature.picture.path]} />
                </View>
              )}
              ListEmptyComponent={loading ? this.ListEmpty : null}
              keyExtractor={index => index.toString()} />
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
    alignItems: "center",
    flexGrow: 1,
    paddingLeft: 5
  },
  titleCategorie: {
    paddingBottom: 15,
    color: 'white',
    // fontWeight: 'bold'
  },
  imageMovie: {
    marginRight: 10,
    width: 120,
    height: 180
  },
  messageNotFound: {
    color: '#fff',
    textAlign: 'center'
  },
  title: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingBottom: 10
  },
  list: {
    paddingLeft: 15
  }
});

export default User;