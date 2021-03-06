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
import {SQLite} from 'expo-sqlite';
var db = SQLite.openDatabase('QuizDatabase.db');


export default class ScoreScreen extends Component {
  constructor(props){
    super(props);
    this.state ={
        username: this.props.username
    }

  }
  render() {
    return (
      <Wallpaper>
        <View style={styles.container}>
          <Logo heading="You Scored: "/>
        </View>
        <View style={styles.score}>
          <Text style={styles.textBig}> {this.props.score} Points</Text>
        </View>
        <View style={styles.buttons}>
          <ButtonSubmit label="Back To Main Menu" moveTo="MainScreen" username={this.state.username} />
          <ButtonSubmit label="Back To Game Selection" moveTo="GameTypeScreen" username={this.state.username} />
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
    //backgroundColor: 'blue'
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    //backgroundColor: 'red',
    top: 100
  },
  score:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    //backgroundColor: 'orange'
  },
  textBig: {
    fontSize: 50
  }


});
