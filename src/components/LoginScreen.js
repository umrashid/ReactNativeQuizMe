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
      isLoadingLogin: false,
      isLoadingSignUp: false,
      username: '',
      password: '',
      userNamePrompt: 'Username',
      passwordPrompt: 'Password',

    }
    console.log("database");
//////////////////////////////////////////////////////////////////
    db.transaction(function(txn) {
        txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='user'",
          [],
          function(tx, res) {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS user', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS user(user_id VARCHAR(255) PRIMARY KEY NOT NULL, passwordLogin VARCHAR(10) NOT NULL);',
                []
              );
            }
          },
          function(tx, error){
             console.log("DB Failed");
          }
        );
      });
//////////////////////////////////////////////////////////////////
      // db.transaction(function(tx) {
      //             tx.executeSql(
      //               'INSERT INTO user (user_id, passwordLogin) VALUES (?,?)',
      //               ['player6', 'hello'],
      //               (tx, results) => {
      //                 console.log('Results', results.rowsAffected);
      //                 if (results.rowsAffected > 0) {
      //                   console.log(results.insertId);
      //                   console.log("Success");
      //                 } else {
      //                   console.log('Registration Failed');
      //                 }
      //               },
      //               (tx, error) => {
      //                 console.log(error);
      //               },
      //             );
      //           });
      // db.transaction(function (tx) {
      //   tx.executeSql("INSERT INTO user (user_id, passwordLogin) VALUES (?,?)", ['player3', 'hello3']);
      //   tx.executeSql("INSERT INTO user (user_id, passwordLogin) VALUES (?,?)", ['player4', 'hello4']);
      //   tx.executeSql("INSERT INTO user (user_id, passwordLogin) VALUES (?,?)", ['player5', 'hello5']);
      //
      // });
///////////////////////////////////////////////////////////////////
      // db.transaction(function (tx) {
      //   tx.executeSql("DELETE from user where user_id = ?", [""]);
      //
      // });
//////////////////////////////////////////////////////////////////
      db.transaction(tx => {
            tx.executeSql('SELECT * FROM user', [], (tx, results) => {
              console.log(results.rows.length);
              for (let i = 0; i < results.rows.length; ++i) {
                console.log(results.rows.item(i));
              }
            },
            (tx, error) => {
              console.log(error);
            },
          );
          });
//////////////////////////////////////////////////////////////////
  }

  handleUsername = (text) => {
    this.setState({username: text});
    console.log(text);
  }
  handlePassword = (text) => {
    this.setState({password: text});

  }
  login = () => {
    if (this.state.isLoadingLogin) return;
    var matchPassword = false;
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM user where user_id= ?', [this.state.username], (tx, results) => {
          console.log(results.rows.length);
          if(results.rows.length >= 1){
            for (let i = 0; i < results.rows.length; ++i) {
              var dbPassword =results.rows.item(i).passwordLogin;
              console.log(dbPassword);
            }
            if(dbPassword == this.state.password){
              console.log("Match Password");
              matchPassword = true;
            }
            if(matchPassword == true){
              this.setState({isLoadingLogin: true});
              console.log(this.state.username + "     " + this.state.password)
              setTimeout(() => {
                Actions.MainScreen();
                this.setState({isLoadingLogin: false});
              }, 2300);
          }else{
            alert("Invalid Password");
          }
        }else{
          alert("User ID doesn't exist");
        }
      },
        (tx, error) => {
          console.log(error);
        },
      );
    });
  }

  signUp = () =>{
    this.setState({isLoadingSignUp: true});
    console.log(this.state.username + "     " + this.state.password)
    setTimeout(() => {
      Actions.SignUpScreen();
      this.setState({isLoadingSignUp: false});
    }, 2300);
  }




  componentDidMount() {

  db.transaction(tx => {
    tx.executeSql(
      "select * from users",(tx, results) =>{console.log(results)},(tx, error) => {console.log(error)}
    );
  }, );
}


  render() {
    return (
      <Wallpaper>
        <View style={styles.logo}>
          <Logo heading="Please Sign In"/>
        </View>
        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Image source={usernameImg} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder= {this.state.userNamePrompt}
              autoCapitalize= 'none'
              returnKeyType= 'done'
              onChangeText = {this.handleUsername}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Image source={passwordImg} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder={this.state.passwordPrompt}
              autoCapitalize= 'none'
              returnKeyType= 'done'
              onChangeText = {this.handlePassword}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
            />
          </View>
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
        <View style={styles.button}>
            <View style={styles.circle}>
                <TouchableOpacity
                  style={styles.buttonSubmit}
                  onPress={this.signUp}
                  activeOpacity={1}>
                  {this.state.isLoadingSignUp ? (
                    <Image source={spinner} style={styles.image} />
                  ) : (
                    <Text style={styles.text}>Sign Up!</Text>
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
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    top: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  marginbutton: {
    top: 10
  }
});
