import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Images from '../assets';
import api from '../services/api';
import ButtonOscar from '../components/ButtonOscar';
import reducerString from '../utils/reducerString';
import Loading from '../components/Loading';

class Movie extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pivot: this.props.navigation.state.params.movie
    }
  }

  placeBet = async (pivot, favorite = false) => {

    this.setState({ loading: true });

    try {
      if (favorite) {
        request = await api.post(`category/${pivot.category_id}/feature/${pivot.feature_id}`, { favorite: true });
      } else {
        request = await api.post(`category/${pivot.category_id}/feature/${pivot.feature_id}`);
      }
      Alert.alert(
        'Congratz',
        'Successful registration',
        [
          { text: 'OK' },
        ],
        { cancelable: false }
      )
      this.setState({ loading: false });
      this.props.navigation.goBack();
    } catch (e) {
      Alert.alert(
        'Ops',
        e.message,
        [
          { text: 'OK' },
        ],
        { cancelable: false }
      )
    }
  }

  render() {

    const { name, picture, watched, pivot } = this.props.navigation.state.params.movie;
    const categorie = this.props.navigation.state.params.item.name;

    return (
      <View style={styles.container}>
        {watched ? <Icon name='check' color='#FFCF00' size={20} style={{ marginBottom: 5 }} /> : null}
        <Image style={styles.image} source={Images[picture.path]} resizeMethod='scale' />
        <Text style={styles.title}>{reducerString(name, 20)}</Text>
        <Text style={styles.categorie}>{reducerString(categorie, 30)}</Text>
        {!this.state.loading ?
          <View style={styles.buttonContainer}>
            <ButtonOscar title='Bet' bg='white' colorText='black' method={() => this.placeBet(pivot)} />
            <ButtonOscar title='Favorite Bet' bg='#FFCF00' colorText='black' method={() => this.placeBet(pivot, true)} />
          </View>
          : <Loading background='#040404' size='large' color='#FFCF00' />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#040404",
    padding: 10
  },
  image: {
    width: '100%',
    borderRadius: 5,
    width: 182,
    height: 268
  },
  question: {
    color: 'white',
    marginBottom: 10,
    fontSize: 14
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 18
  },
  categorie: {
    color: '#FFCF00',
  },
  buttonContainer: {
    paddingTop: 20
  }
});

export default Movie;