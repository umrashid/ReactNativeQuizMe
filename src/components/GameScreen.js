import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';


export default function App() {
  return (
    <Wallpaper>
      <View style={styles.logo}>
        <Logo heading="Please fill the form to Sign Up"/>
      </View>
      <View style={styles.form}>

      </View>
      <View style={styles.button}>

      </View>
    </Wallpaper>
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  form: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    flex: 1,
    top: 110,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
