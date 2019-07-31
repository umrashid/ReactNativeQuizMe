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

export default class DifficultyLevelScreen extends Component {
  render() {
    return (
      <Wallpaper>
        <View style={styles.container}>
          <Logo heading="Choose your difficulty level: "/>
        </View>
        <View style={styles.buttons}>
          <ButtonSubmit label="Easy" />
          <ButtonSubmit label="Medium" />
          <ButtonSubmit label="Hard" />
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
