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
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';


export default class CategoryScreen extends Component {
  render() {
    return (
      <Wallpaper>
        <View style={styles.container}>
          <Logo heading="Choose your difficulty level: "/>
        </View>
        <View style={styles.buttons}>
          <ButtonSubmit label="Capitals" categoryID = '1' categoryOrDifficulty = 'true' />
          <ButtonSubmit label="Astrology" categoryID = '2' categoryOrDifficulty = 'true' />
          <ButtonSubmit label="Politics" categoryID = '3' categoryOrDifficulty = 'true' />
          <ButtonSubmit label="Animals" categoryID = '4' categoryOrDifficulty = 'true' />
          <ButtonSubmit label="Georgraphy" categoryID = '5' categoryOrDifficulty = 'true' />
          <ButtonSubmit label="Automobiles" categoryID = '6' categoryOrDifficulty = 'true' />
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
    justifyContent: 'space-around',
  },
  gap: {
    marginTop: 50
  }


});
