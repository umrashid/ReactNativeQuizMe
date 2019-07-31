import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import LoginScreen from './src/components/LoginScreen';
import SignUpScreen from './src/components/SignUpScreen';
import SecondScreen from './src/components/SecondScreen';
import CreateUser from './src/components/CreateUser';
import MainScreen from './src/components/MainScreen';
import GameTypeScreen from './src/components/GameTypeScreen';
import DifficultyLevelScreen from './src/components/DifficultyLevelScreen';

export default function App() {
  return (
    <Router>
      <Scene key="root">
        <Scene key="LoginScreen"
          component={LoginScreen}
          animation='fade'
          hideNavBar={true}
          initial={true}
        />
        <Scene key="secondScreen"
          component={SecondScreen}
          animation='fade'
          hideNavBar={true}
        />
        <Scene key="CreateUser"
          component={CreateUser}
          animation='fade'
          hideNavBar={true}
        />
        <Scene key="MainScreen"
          component={MainScreen}
          animation='fade'
          hideNavBar={true}
        />
        <Scene key="GameTypeScreen"
          component={GameTypeScreen}
          animation='fade'
          hideNavBar={true}
        />
        <Scene key="DifficultyLevelScreen"
          component={DifficultyLevelScreen}
          animation='fade'
          hideNavBar={true}
        />
        <Scene key="SignUpScreen"
          component={SignUpScreen}
          animation='fade'
          hideNavBar={true}
        />
      </Scene>
    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
