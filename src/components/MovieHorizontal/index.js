import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Images from '../../assets';

class MovieHorizontal extends PureComponent {

  render() {
    const { item, onPress, onLongPress } = this.props;

    return (
      <View>
        <Text style={styles.titleCategorie}>{item.name}</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
          {item.features.map(movie => (
            <View key={movie.id}>
              <TouchableOpacity onPress={() => onPress({ item, movie })} onLongPress={() => onLongPress(movie)}>
                {movie.watched ? <Icon name='check' color='#FFCF00' size={20} style={{ position: 'absolute', marginTop: 5, marginLeft: 5, zIndex: 99999 }} /> : null}
                <Image resizeMode='cover' style={styles.imageMovie} source={Images[movie.picture.path]} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleCategorie: {
    paddingBottom: 15,
    paddingTop: 15,
    color: 'white',
    fontWeight: 'bold'
  },
  imageMovie: {
    marginRight: 10,
    width: 120,
    height: 180,
  }
});

export default MovieHorizontal;