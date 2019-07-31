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


export default class DifficultyLevelScreen extends Component {
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
          <Logo heading="Choose your difficulty for Leaderboards: "/>
        </View>
        <View style={styles.buttons}>
          <ButtonSubmit label="Easy" difficultyID = '1' categoryOrDifficulty = 'false' username={this.state.username} />
          <ButtonSubmit label="Medium" difficultyID = '2' categoryOrDifficulty = 'false' username={this.state.username} />
          <ButtonSubmit label="Hard" difficultyID = '3' categoryOrDifficulty = 'false' username={this.state.username} />
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
