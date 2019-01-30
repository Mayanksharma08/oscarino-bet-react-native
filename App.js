import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

import Auth from './src/screens/Auth';
import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';
import Movies from './src/screens/Movies';
import Movie from './src/screens/Movie';
import Bets from './src/screens/Bets';
import User from './src/screens/User';

import AuthLoading from './src/components/AuthLoading';

const StackMovies = createStackNavigator({
  Movies: {
    screen: Movies,
    navigationOptions: () => ({
      title: 'Movies',
      headerStyle: {
        backgroundColor: '#040404'
      },
      headerTitleStyle: {
        color: "white"
      }
    }),
  },
  Movie: {
    screen: Movie,
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: '#040404'
      },
      headerTintColor: 'white',
    }),
  }
}, {
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: '#040404'
      },
      headerTitleStyle: {
        color: "white"
      }
    })
  });

const StackBets = createStackNavigator({
  Bets: {
    screen: Bets,
    navigationOptions: () => ({
      title: 'My Bets',
      headerStyle: {
        backgroundColor: '#040404'
      },
      headerTitleStyle: {
        color: "white"
      }
    }),
  }
});

const StackUser = createStackNavigator({
  User: {
    screen: User,
    navigationOptions: () => ({
      title: 'User',
      headerStyle: {
        backgroundColor: '#040404'
      },
      headerTitleStyle: {
        color: "white"
      }
    }),
  },
});

const TabNav = createBottomTabNavigator({
  'Movies': {
    screen: StackMovies,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => {
        return (
          <Icon name='film' color={tintColor} />
        );
      }
    })
  },
  'My Bets': {
    screen: StackBets,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => {
        return (
          <Icon name='star' color={tintColor} />
        );
      }
    })
  },
  User: {
    screen: StackUser,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => {
        return (
          <Icon name='user' color={tintColor} />
        );
      }
    })
  },
}, {
    tabBarOptions: {
      showIcon: true,
      style: {
        backgroundColor: '#040404'
      },
      inactiveTintColor: 'white',
      activeTintColor: '#FFCF00'
    }
  });

const AuthStack = createStackNavigator({
  Auth: Auth,
  SignUp: {
    screen: SignUp,
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: '#040404'
      },
      headerTintColor: 'white',
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: '#040404'
      },
      headerTintColor: 'white',
    }),
  }
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: TabNav,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading',
  }
));