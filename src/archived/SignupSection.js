import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, View, Text, TouchableOpacity, Alert, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class SignupSection extends Component {
  constructor() {
    super();
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    Alert.alert(
         'You need to...'
      );
  }
  render() {
    return (
      <View style={styles.container}>
          <Text style = {styles.text} onPress = {this._onPress}>
             Create User
          </Text>
        <Text style={styles.text}>Forgot Password?</Text>
      </View>
    );
  }

}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 85,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
});
