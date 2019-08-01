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
      LeaderboardcategoryOrDifficulty: this.props.LeaderboardcategoryOrDifficulty,
      totalPoints: '',
      rank: '',
      averagePoints: '',
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // /Get totalPoints and Rank
    if(this.state.LeaderboardcategoryOrDifficulty == 'true'){
      //Total Points Category
        db.transaction(tx => {
              tx.executeSql('SELECT * FROM leaderboard_category_total where user_id = ? and categoryID = ? ', [this.state.username,this.state.categoryID], (tx, results) => {
                console.log(results.rows.length);
                if(results.rows.length == 0){
                  this.setState({totalPoints: 'N/A'})
                }else{
                  console.log("Total Points: " + results.rows._array[0].totalpoints);
                  this.setState({totalPoints: results.rows._array[0].totalpoints})
              }
                //console.log(this.state.questions);
                // for (let i = 0; i < results.rows.length; ++i) {
                //   console.log(results.rows.item(i));
                // }

              },
              (tx, error) => {
                console.log(error);
              },
            );
            });
          // Rank Category
          db.transaction(tx => {
                tx.executeSql('SELECT * FROM leaderboard_category_total where categoryID = ? order by totalpoints', [this.state.categoryID], (tx, results) => {
                  console.log(results.rows.length);
                  if(results.rows.length == 0){
                    this.setState({rank: 'N/A'})
                  }else{
                    for (let i = 0; i < results.rows.length; ++i) {
                      console.log(results.rows._array[i].user_id)
                      if(this.state.username == results.rows._array[i].user_id){
                          this.setState({rank: i+1})
                      }else{
                        this.setState({rank: 'N/A'})
                      }
                     }
                }


                },
                (tx, error) => {
                  console.log(error);
                },
              );
              });
          //Average Score Category
          db.transaction(tx => {
                tx.executeSql('SELECT * FROM leaderboard_category_average where user_id = ? and categoryID = ? ', [this.state.username,this.state.categoryID], (tx, results) => {
                  console.log(results.rows.length);
                  if(results.rows.length == 0){
                    this.setState({averagePoints: 'N/A'})
                  }else{
                    console.log("Total Points: " + results.rows._array[0].totalpoints);
                    this.setState({averagePoints: results.rows._array[0].totalpoints})
                }
                  //console.log(this.state.questions);
                  // for (let i = 0; i < results.rows.length; ++i) {
                  //   console.log(results.rows.item(i));
                  // }

                },
                (tx, error) => {
                  console.log(error);
                },
              );
              });

    }else{
      //Total Points Difficulty
      db.transaction(tx => {
            tx.executeSql('SELECT * FROM leaderboard_difficulty_total where user_id = ? and difficultyID = ? ', [this.state.username, this.state.difficultyID], (tx, results) => {
              console.log(results.rows.length);
              if(results.rows.length == 0){
                this.setState({totalPoints: 'N/A'})
              }else{
                console.log("Total Points: " + results.rows._array[0].totalpoints);
                this.setState({totalPoints: results.rows._array[0].totalpoints})
            }

            },
            (tx, error) => {
              console.log(error);
            },
          );
          });
      //Rank Difficulty
          db.transaction(tx => {
                tx.executeSql('SELECT * FROM leaderboard_difficulty_total where difficultyID = ? order by totalpoints', [this.state.difficultyID], (tx, results) => {
                  console.log(results.rows._array);
                  if(results.rows.length == 0){
                    this.setState({rank: 'N/A'})
                  }else{
                    for (let i = 0; i < results.rows.length; ++i) {
                      console.log("Umair");
                      console.log(results.rows._array[i].user_id)
                      if(this.state.username == results.rows._array[i].user_id){
                          this.setState({rank: i+1})
                      }else{
                        this.setState({rank: 'N/AA'})
                      }
                     }
                }


                },
                (tx, error) => {
                  console.log(error);
                },
              );
              });
        //Average Score Difficulty
        db.transaction(tx => {
              tx.executeSql('SELECT * FROM leaderboard_difficulty_average where user_id = ? and difficultyID = ? ', [this.state.username, this.state.difficultyID], (tx, results) => {
                console.log(results.rows.length);
                if(results.rows.length == 0){
                  this.setState({averagePoints: 'N/A'})
                }else{
                  console.log("Total Points: " + results.rows._array[0].totalpoints);
                  this.setState({averagePoints: results.rows._array[0].totalpoints})
              }

              },
              (tx, error) => {
                console.log(error);
              },
            );
            });
    }
  }

  render() {
    console.log("Username is " + this.props.username)
    console.log("categoryID is " + this.props.categoryID)
    console.log("difficultyID is " + this.props.difficultyID)
    console.log("LeaderboardcategoryOrDifficulty is " + this.props.LeaderboardcategoryOrDifficulty)
    return (
      <Wallpaper>
        <View style={styles.logo}>
          <Logo heading="Your Score: " />
        </View>
        <View style={styles.displayText}>
          <Text style={styles.display}> Username: {this.state.username}</Text>
          <Text style={styles.display}> Rank: {this.state.rank}</Text>
          <Text style={styles.display}> Total Points: {this.state.totalPoints}</Text>
          <Text style={styles.display}> Average Points: {this.state.averagePoints}</Text>
        </View>
        <View style={styles.button}>
          <ButtonSubmit label="Back To Main Menu" moveTo="MainScreen" username={this.state.username} />
          <ButtonSubmit label="Back To View Score" moveTo="GameTypeScreenLeaderboard" username={this.state.username} />
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
    justifyContent: 'flex-start',
    //backgroundColor: 'blue'
  },
  button: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    top: 100
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
