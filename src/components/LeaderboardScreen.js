import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
//import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import Dimensions from 'Dimensions';
import {SQLite} from 'expo-sqlite';
import {Actions, ActionConst} from 'react-native-router-flux';
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
var db = SQLite.openDatabase('QuizDatabase.db');
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';
import spinner from '../images/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.username,
      categoryID: this.props.categoryID,
      difficultyID: this.props.difficultyID,
      totalPoints: '',
      rank: '',
    }

  }

  render() {
    return (
      <Wallpaper>
        <View style={styles.logo}>
          <Logo heading="Leaderboards: " />
        </View>
        <View style={styles.displayText}>
          <Text style={styles.display}> Username: {this.state.username}</Text>
          <Text style={styles.display}> Rank: {this.state.rank}</Text>
          <Text style={styles.display}> Total Points: {this.state.totalPoints}</Text>
        </View>
        <View style={styles.button}>
          <View style={styles.circle}>
              <TouchableOpacity
                style={styles.buttonSubmit}
                onPress={this.login}
                activeOpacity={1}>
                {this.state.isLoadingLogin ? (
                  <Image source={spinner} style={styles.image} />
                ) : (
                  <Text style={styles.text}>Login</Text>
                )}
              </TouchableOpacity>
          </View>
        </View>
      </Wallpaper>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'red'
  },
  displayText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'blue'
  },
  button: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
    //backgroundColor: 'orange'
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
  },
  inputWrapper: {
    marginTop: 10,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
  buttonSubmit: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: 350,
    marginTop: 20,
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
  marginbutton: {
    top: 10
  },
  display: {
      color: 'white',
      backgroundColor: 'transparent',
      fontSize: 20
  }
});
