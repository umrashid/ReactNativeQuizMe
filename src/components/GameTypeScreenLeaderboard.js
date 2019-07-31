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


export default class GameTypeScreen extends Component {
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
          <Logo heading="Choose the type of Leaderboard to View: "/>
        </View>
        <View style={styles.buttons}>
          <ButtonSubmit label="Categories" moveTo="CategoryScreenLeaderboard"  username = {this.state.username} />
          <ButtonSubmit label="Difficulty Level" moveTo = "DifficultyLevelScreenLeaderboard" username = {this.state.username} />
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
