import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
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
import {Actions, ActionConst} from 'react-native-router-flux';
import {SQLite} from 'expo-sqlite';
var db = SQLite.openDatabase('QuizDatabase.db');

import spinner from '../images/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      username : this.props.username,
      password : this.props.password,
      categoryID: this.props.categoryID,
      categoryOrDifficulty: this.props.categoryOrDifficulty,
      difficultyID: this.props.difficultyID
    };
    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }



  _onPress() {
    if (this.state.isLoading) return;
    this.setState({isLoading: true})
    if(this.state.categoryOrDifficulty == 'true'){
      setTimeout(() => {
        Actions.GameScreen({
          username: this.state.username,
          categoryID: this.state.categoryID,
          categoryOrDifficulty: this.state.categoryOrDifficulty
        })
        this.setState({isLoading: false});
        this.buttonAnimated.setValue(0);
        this.growAnimated.setValue(0);
      }, 1300);
    }else if(this.state.categoryOrDifficulty == 'false'){
      setTimeout(() => {
        Actions.GameScreen({
          username: this.state.username,
          difficultyID: this.state.difficultyID,
          categoryOrDifficulty: this.state.categoryOrDifficulty
        })
        this.setState({isLoading: false});
        this.buttonAnimated.setValue(0);
        this.growAnimated.setValue(0);
      }, 1300);

    }else{

        this.setState({isLoading: true});
        Animated.timing(this.buttonAnimated, {
          toValue: 1,
          duration: 200,
          easing: Easing.linear,
        }).start();

        console.log(this.state.username);

        setTimeout(() => {
          if(this.props.moveTo == "MainScreen"){
            Actions.MainScreen({username: this.state.username});
          }else if(this.props.moveTo == "CreateUser" ){
            Actions.CreateUser();
          }else if(this.props.moveTo == "GameTypeScreen" ){
            Actions.GameTypeScreen({username: this.state.username});
          }else if(this.props.moveTo == "DifficultyLevelScreen" ){
            Actions.DifficultyLevelScreen({username: this.state.username});
          }else if(this.props.moveTo == "CategoryScreen" ){
            Actions.CategoryScreen({username: this.state.username});
          }else if(this.props.moveTo == "GameTypeScreenLeaderboard" ){
            Actions.GameTypeScreenLeaderboard({username: this.state.username});
          }else if(this.props.moveTo == "DifficultyLevelScreenLeaderboard" ){
            Actions.DifficultyLevelScreenLeaderboard({username: this.state.username});
          }else if(this.props.moveTo == "CategoryScreenLeaderboard" ){
            Actions.CategoryScreenLeaderboard({username: this.state.username});
          }else {
            Actions.LoginScreen();
          }
          this.setState({isLoading: false});
          this.buttonAnimated.setValue(0);
          this.growAnimated.setValue(0);
        }, 1300);
      }
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

getUsernamePassword(){
    db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM user where user_id = ?',
      [this.state.username],
      (tx, results) => {
        if (len > 0) {
          alert(results.rows.item(0));
        } else {
          alert('No user found');
          this.setState({
            userData: '',
          });
        }
      }
    );
  });
}

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>{this.props.label}</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -95,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});
