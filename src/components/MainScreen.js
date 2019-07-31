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

export default class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state ={
      username: this.props.username
    }

    console.log("User ID passed to main Screen: " + this.props.username);
  }

componentDidUpdate = () => {
  console.log("User ID passed to main Screen: " + this.state.username);
}
  render() {
    return (
      <Wallpaper>
        <View style={styles.container}>
          <Logo heading="Menu"/>
        </View>
        <View style={styles.buttons}>
          <ButtonSubmit label="Play" moveTo="GameTypeScreen" username= {this.state.username}/>
          <ButtonSubmit label="Leaderboards" username= {this.state.username}/>
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
