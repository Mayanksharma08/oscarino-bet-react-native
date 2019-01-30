import React, { Component, Fragment } from "react";
import { StyleSheet, FlatList, AsyncStorage } from "react-native";

import api from '../services/api';
import Loading from '../components/Loading';
import MovieHorizontal from '../components/MovieHorizontal';

class Movies extends Component {

  constructor(props){
    super(props);
    this.state = {
      categories: [],
      loading: false
    }
  }

  async componentDidMount () {
    const token = await AsyncStorage.getItem('userToken');
    api.defaults.headers.common['Authorization'] = token;
    const request = await api.get('categories_features');
    const categories = request.data.result;
    this.setState({categories, loading: true});
  }
  
  render() {
    return (
      <Fragment>
        {!this.state.loading && <Loading background='#040404' size='large' color='#FFCF00' /> }
        <FlatList
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          style={styles.container}
          data={this.state.categories} 
          renderItem={({item}) => {
            return (
              <MovieHorizontal item={item} onPress={params => this.props.navigation.navigate('Movie', params)} />
            )
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#040404',
    padding: 10
  }
});

export default Movies;