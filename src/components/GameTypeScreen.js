import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View,
} from 'react-native';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import SignUp from './SignUp';

export default class GameTypeScreen extends Component {
  render() {
    return (
      <Wallpaper>
        <View style={styles.container}>
          <Logo heading="Choose the type of the questions: "/>
        </View>
        <View style={styles.buttons}>
          <ButtonSubmit label="Categories" moveTo="CategoryScreen" />
          <ButtonSubmit label="Difficulty Level" moveTo = "DifficultyLevelScreen"/>
        </View>
      </Wallpaper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },


});
