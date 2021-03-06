import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
//import Form from './Form';
import Wallpaper from './Wallpaper';
// import ButtonSubmit from './ButtonSubmit';
import * as Progress from 'react-native-progress';
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
      isLoading: false,
      username: this.props.username,
      questionText: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
      categoryID: this.props.categoryID,
      difficultyID: this.props.difficultyID,
      questions: '',
      score: 0,
      progress: 0,
      categoryOrDifficulty: this.props.categoryOrDifficulty,
    }
    console.log(this.state.categoryID)
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // /Get Questions
    if(this.state.categoryOrDifficulty == 'true'){
        db.transaction(tx => {
              tx.executeSql('SELECT * FROM question where categoryID = ? ', [this.state.categoryID], (tx, results) => {
                console.log(results.rows.length);
                this.setState({questions: this.shuffle(results.rows._array).slice(0,5)})
                var random = Math.floor(Math.random() * (3 - 0)) + 0;
                this.randomOption(random)
                this.state.questions.shift();
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
      db.transaction(tx => {
            tx.executeSql('SELECT * FROM question where difficultyID = ? ', [this.state.difficultyID], (tx, results) => {
              console.log(results.rows.length);
              this.setState({questions: this.shuffle(results.rows._array).slice(0,5)})
              var random = Math.floor(Math.random() * (3 - 0)) + 0;
              this.randomOption(random)
              this.state.questions.shift();
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
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  componentDidUpdate = () =>{
    console.log(this.state.questions);
    console.log(this.state.score);
    console.log(this.state.username);
  }

   shuffle = (array) => {

  	var currentIndex = array.length;
  	var temporaryValue, randomIndex;

  	// While there remain elements to shuffle...
  	while (0 !== currentIndex) {
  		// Pick a remaining element...
  		randomIndex = Math.floor(Math.random() * currentIndex);
  		currentIndex -= 1;

  		// And swap it with the current element.
  		temporaryValue = array[currentIndex];
  		array[currentIndex] = array[randomIndex];
  		array[randomIndex] = temporaryValue;
  	}

  	return array;

  };

  onPress = (event, title) => {
    this.setState({isLoading: true})
    setTimeout(() => {
      this.setState({isLoading: false});
      console.log(title);
      if(title == this.state.answer){
        console.log("Correct Answer");
        this.setState({score: this.state.score+10})
        this.setState({progress: this.state.score/50})
        console.log(this.state.score);

      }else{
        console.log("Incorrect Answer");
        this.setState({score: this.state.score-4})
        this.setState({progress: this.state.score/50})
        console.log(this.state.score);
      }
      if(this.state.questions.length > 0){
        var random = Math.floor(Math.random() * (3 - 0)) + 0;
        this.randomOption(random);
        this.state.questions.shift();
      }else{
        console.log("Exit");
        this.insertScore(this.state.username, this.state.score, this.state.categoryID,this.state.difficultyID);
        Actions.ScoreScreen({
          score: this.state.score
        });
      }
    }, 500);
  };

  insertScore = (username,score,categoryID,difficultyID) => {
    if(this.state.categoryOrDifficulty == 'true'){
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //ADD Score to Category
            db.transaction(function(tx) {
                        tx.executeSql(
                          'INSERT INTO score_category (user_id, score, categoryID) VALUES (?,?,?)',
                          [username, score, categoryID],
                          (tx, results) => {
                            console.log('Results', results.rowsAffected);
                            if (results.rowsAffected > 0) {
                              console.log(results.insertId);
                              console.log("Success");
                            } else {
                              console.log('Registration Failed');
                            }
                          },
                          (tx, error) => {
                            console.log(error);
                          },
                        );
                      });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //VIEW Category Score
              db.transaction(tx => {
                    tx.executeSql('SELECT * FROM score_category order by user_id ASC', [], (tx, results) => {
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
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }else{
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //ADD Score to Difficulty
            db.transaction(function(tx) {
                        tx.executeSql(
                          'INSERT INTO score_difficulty (user_id, score, difficultyID) VALUES (?,?,?)',
                          [username, score, difficultyID],
                          (tx, results) => {
                            console.log('Results', results.rowsAffected);
                            if (results.rowsAffected > 0) {
                              console.log(results.insertId);
                              console.log("Success");
                            } else {
                              console.log('Registration Failed');
                            }
                          },
                          (tx, error) => {
                            console.log(error);
                          },
                        );
                      });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //VIEW Difficulty Score
              db.transaction(tx => {
                    tx.executeSql('SELECT * FROM score_difficulty  order by user_id ASC', [], (tx, results) => {
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
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      }
  };


randomOption = (number) => {
  switch(number){
    case 0:
          this.setState({
            questionText: this.state.questions[0].question,
            option1: this.state.questions[0].correct,
            option2: this.state.questions[0].option3,
            option3: this.state.questions[0].option2,
            option4: this.state.questions[0].option1,
            answer: this.state.questions[0].correct,
          })
          break;
    case 1:
          this.setState({
            questionText: this.state.questions[0].question,
            option1: this.state.questions[0].option2,
            option2: this.state.questions[0].correct,
            option3: this.state.questions[0].option1,
            option4: this.state.questions[0].option3,
            answer: this.state.questions[0].correct,
          })
          break;
    case 2:
          this.setState({
            questionText: this.state.questions[0].question,
            option1: this.state.questions[0].option2,
            option2: this.state.questions[0].option1,
            option3: this.state.questions[0].correct,
            option4: this.state.questions[0].option3,
            answer: this.state.questions[0].correct,
          })
          break;
    case 2:
          this.setState({
            questionText: this.state.questions[0].question,
            option1: this.state.questions[0].option1,
            option2: this.state.questions[0].option2,
            option3: this.state.questions[0].option3,
            option4: this.state.questions[0].correct,
            answer: this.state.questions[0].correct,
          })
          break;
  }
};

  render() {
    return (
      <Wallpaper>
        <View style={styles.logo}>
          <Logo heading="Game"/>
        </View>
        <View style={styles.question}>
          <Text style={styles.questionShow}> {this.state.questionText} </Text>
        </View>
        <View style={styles.button}>
          <View style={styles.circle}>
              <TouchableOpacity
                style={styles.buttonSubmit}
                onPress={(event) => this.onPress(event, this.state.option1)}
                activeOpacity={1}>
                {this.state.isLoading ? (
                  <Image source={spinner} style={styles.image} />
                ) : (
                  <Text style={styles.text}>{this.state.option1}</Text>
                )}
              </TouchableOpacity>
          </View>
        </View>
        <View style={styles.button}>
            <View style={styles.circle}>
                <TouchableOpacity
                  style={styles.buttonSubmit}
                  onPress={(event) => this.onPress(event, this.state.option2)}
                  activeOpacity={1}>
                  {this.state.isLoading ? (
                    <Image source={spinner} style={styles.image} />
                  ) : (
                    <Text style={styles.text}>{this.state.option2}</Text>
                  )}
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.button}>
            <View style={styles.circle}>
                <TouchableOpacity
                  style={styles.buttonSubmit}
                  onPress={(event) => this.onPress(event, this.state.option3)}
                  activeOpacity={1}>
                  {this.state.isLoading ? (
                    <Image source={spinner} style={styles.image} />
                  ) : (
                    <Text style={styles.text}>{this.state.option3}</Text>
                  )}
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.button}>
            <View style={styles.circle}>
                <TouchableOpacity
                  style={styles.buttonSubmit}
                  onPress={(event) => this.onPress(event, this.state.option4)}
                  activeOpacity={1}>
                  {this.state.isLoading ? (
                    <Image source={spinner} style={styles.image} />
                  ) : (
                    <Text style={styles.text}>{this.state.option4}</Text>
                  )}
                </TouchableOpacity>
            </View>
        </View>
        <View>
          <Progress.Bar
          progress={this.state.progress}
          width={DEVICE_WIDTH}
          animated = {true}
          color= "red"
          unfilledColor = "white"

          />
        </View>
      </Wallpaper>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  question: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
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
  },
  questionShow: {
    color: 'white',
    fontSize: 26,
    textAlign: 'center'
  }
});
