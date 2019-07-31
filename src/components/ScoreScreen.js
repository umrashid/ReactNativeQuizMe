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
    super(props);
    this.state = {


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
          <ButtonSubmit label="Back To Main Menu" moveTo="MainScreen" />
          <ButtonSubmit label="Back To Game Selection" moveTo="GameTypeScreen" />
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
