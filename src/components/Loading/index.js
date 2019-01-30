import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loading = props => (
  <View style={{backgroundColor: props.background, flex: 1}}>
    <ActivityIndicator size={props.size} color={props.color} />
  </View>
)

export default Loading;