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
  constructor(props){
    super(props)
    this.state ={
      username: this.props.username
    }
  }
  render() {
    return (
      <Wallpaper>
        <View style={styles.container}>
          <Logo heading="Choose your Category: "/>
        </View>
        <View style={styles.buttons}>
          <ButtonSubmit label="Capitals" categoryID = '1' categoryOrDifficulty = 'true' username = {this.state.username} />
        </View>
        <View style={styles.buttons}>
          <ButtonSubmit label="Astrology" categoryID = '2' categoryOrDifficulty = 'true' username = {this.state.username} />
        </View>
        <View style={styles.buttons}>
          <ButtonSubmit label="Politics" categoryID = '3' categoryOrDifficulty = 'true' username = {this.state.username} />
        </View>
        <View style={styles.buttons}>
          <ButtonSubmit label="Animals" categoryID = '4' categoryOrDifficulty = 'true' username = {this.state.username} />
        </View>
        <View style={styles.buttons}>
          <ButtonSubmit label="Georgraphy" categoryID = '5' categoryOrDifficulty = 'true' username = {this.state.username} />
        </View>
        <View style={styles.buttons}>
          <ButtonSubmit label="Automobiles" categoryID = '6' categoryOrDifficulty = 'true' username = {this.state.username} />
        </View>
      </Wallpaper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gap: {
    marginTop: 50
  }


});
