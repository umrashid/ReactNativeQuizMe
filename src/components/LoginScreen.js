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
//ADD USERS TABLE
    // db.transaction(function(txn) {
    //     txn.executeSql(
    //     "SELECT name FROM sqlite_master WHERE type='table' AND name='user'",
    //       [],
    //       function(tx, res) {
    //         console.log('item:', res.rows.length);
    //         if (res.rows.length == 0) {
    //           txn.executeSql('DROP TABLE IF EXISTS user', []);
    //           txn.executeSql(
    //             'CREATE TABLE IF NOT EXISTS user(user_id VARCHAR(255) PRIMARY KEY NOT NULL, passwordLogin VARCHAR(10) NOT NULL);',
    //             []
    //           );
    //         }
    //       },
    //       function(tx, error){
    //          console.log("DB Failed");
    //       }
    //     );
    //   });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ADD USERS
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DELETE USERS
      // db.transaction(function (tx) {
      //   tx.executeSql("DELETE from user where user_id = ?", ['hello']);
      //   tx.executeSql("DELETE from user where user_id = ?", ['player8']);
      //
      // });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//VIEW USERS
      db.transaction(tx => {
            tx.executeSql('SELECT * FROM user order by user_id ASC', [], (tx, results) => {
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
// //ADD QUESTIONS TABLE
//         db.transaction(function(txn) {
//             txn.executeSql(
//             "SELECT name FROM sqlite_master WHERE type='table' AND name='question'",
//               [],
//               function(tx, res) {
//                 console.log('item:', res.rows.length);
//                 if (res.rows.length == 0) {
//                   txn.executeSql('DROP TABLE IF EXISTS question', []);
//                   txn.executeSql(
//                     "Create Table question (questionID int PRIMARY KEY NOT NULL, question varchar(1000) NOT NULL,correct varchar(255) NOT NULL, option1 varchar(255) NOT NULL, option2 varchar(255) NOT NULL,option3 varchar(255) NOT NULL,categoryID int NOT NULL,difficultyID int NOT NULL,questionTypeID int NOT NUlL,ImagePath varchar(1000));",
//                     []
//                   );
//                 }
//               },
//               function(tx, error){
//                  console.log(error);
//               }
//             );
//           });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ADD QUESTIONS
        // var questionsInserts = "INSERT OR IGNORE INTO question (questionID, question, correct, option1, option2, option3, categoryID, difficultyID, questionTypeID, ImagePath) VALUES(83, 'What is the capital of Canada?', 'Ottawa', 'Toronto', 'Vancouver', 'Montreal', 1, 1, 1, NULL),(84, 'What is the capital of USA?', 'Washington DC', 'Chicago', 'Los Angeles', 'New York', 1, 1, 1, NULL),(85, 'What is the capital of UK?', 'London', 'Manchester', 'Liverpool', 'Birmingham', 1, 1, 1, NULL),(86, 'What is the capital of Egypt?', 'Cairo', 'Alexandria', 'Luxor', 'Giza', 1, 2, 1, NULL),(87, 'What is the capital of Australia?', 'Canberra', 'Sydney', 'Melbourne', 'Brisbane', 1, 2, 1, NULL),(88, 'What is the capital of Greece?', 'Athens', 'Mykonons', 'Santorini', 'Larissa', 1, 2, 1, NULL),(89, 'What is the capital of Iran?', 'Tehran', 'Mashhad', 'Isfahan', 'Karaj', 1, 3, 1, NULL),(90, 'What is the capital of Libya?', 'Tripoli', 'Benghazi', 'Misrata', 'Sirte', 1, 3, 1, NULL),(91, 'What is the capital of Romania?', 'Bucharest', 'Brasov', 'Lasi', 'Cluj-Napoca', 1, 3, 1, NULL),(93, 'How many planets are there in our Solar System?', 'Eight', 'Six', 'Seven', 'Ten', 2, 1, 1, 'null'),(94, 'Which of the planet have rings around it?', 'Saturn', 'Venus    ', 'Mars    ', 'Jupiter', 2, 1, 1, 'null'),(95, 'What is the nickname of Mars?', 'Red Planet', 'Red Dot     ', 'Red Marble     ', 'Rusty Planet', 2, 1, 1, 'null'),(96, 'Which is the hottest planet in Solar System?', 'Venus', 'Mars', 'Mercury   ', 'Jupiter     ', 2, 2, 1, 'null'),(97, 'Which of the following planet spin fastest?', 'Jupiter', 'Uranus', 'Mars', ' Mercury ', 2, 2, 1, 'null'),(98, 'Halley?s Comet is seen after ______ years from Earth?', '75 years', '85 years', '90 years', '80 years', 2, 2, 1, 'null'),(99, 'What is the brightest object in the Universe?', 'Quasars ', 'Super Nova', 'Constellation ', 'Stars', 2, 3, 1, 'null'),(100, 'What?s the average temperature at visible surface o f sun a.k.a. Photosphere?', '5800k', '6000k', '5000k', '6500k', 2, 3, 1, 'null'),(101, 'Which planet has the highest mountain in the Solar System?', 'Mars', 'Earth', 'Jupiter', 'Saturn', 2, 3, 1, 'null'),(102, 'Who was the first President of United States of America?', 'George Washington', 'Thomas Jefferson     ', ' Abraham Lincoln', 'James Madison ', 3, 1, 1, 'null'),(103, 'Who is the current Prime Minister of Canada?', 'Justin Trudeau', 'Jagmeet Singh', 'Donald Trump', 'Vladmir Putin', 3, 1, 1, 'null'),(104, 'Where British Columbia Parliament Building located?', 'Victoria', 'Vancouver', 'Kelowna', 'Kamloops', 3, 1, 1, 'null'),(105, 'Which country has largest democracy in the World?', 'India', 'China', 'USA', 'Russia', 3, 2, 1, 'null'),(106, 'How many provinces are there in Canada?', 'Ten', 'Nine', 'Eleven', 'Twelve', 3, 2, 1, 'null'),(107, 'Which President of USA had a famous speech ?We choose to go to the Moon? ?', 'John F. Kennedy', 'George W. Bush', 'Bill Clint', 'Gerald Ford', 3, 2, 1, 'null'),(108, 'Who was the first Prime Minister of Great Britain', 'Robert Walpole', 'Theresa May', 'Boris Johnson', 'William Gladstone', 3, 3, 1, 'null'),(109, 'Which country is not a member of Veto Power of United Nation?', 'Japan ', 'United Kingdom', 'France', 'China', 3, 3, 1, 'null'),(110, 'Who was the first Prime Minister of Canada?', 'Sir John A Macdonald', 'Alexander Mackenzie', 'Sir John Abbott', 'Sir John Thompson', 3, 3, 1, 'null'),(111, 'Which farm animal gives us milk?', 'Cow', 'Horse', 'Dog', 'Hen', 4, 1, 1, 'null'),(112, 'Name the animal with pink color and curly tail', 'Pig', 'Skunk', 'Dog', 'Cow', 4, 1, 1, 'null'),(113, 'Which of the animal is known as for chasing rats?', 'Cat', 'Kangaroo', 'Deer', 'Ox', 4, 1, 1, 'null'),(114, 'Which is the fastest land animal?', 'Cheetah', 'Jackal', 'Tiger', 'Jaguar', 4, 2, 1, 'null'),(115, 'In which continent, we cannot find Bees?', 'Antartica', 'Europe', 'Noth America', 'Antartica', 4, 2, 1, 'null'),(116, 'Which of the following bird can fly?', 'Flamingo', 'Penguin', 'Ostrich', 'Kiwi', 4, 2, 1, 'null'),(117, 'What is the national animal of Canada?', 'Beaver', 'Canadian Goose', 'Raccoon', 'Grizzly Bear', 4, 3, 1, 'null'),(118, 'What do you call a baby goat?', 'Kid', 'Lamb', 'Cub', 'Pup', 4, 3, 1, 'null'),(119, 'Among these birds, which one is the smallest?', 'Humming Bird', 'Nightingale', 'Sparrow', 'Crow', 4, 3, 1, 'null'),(120, 'Which is the largest country in the World?', 'Russia', 'Canada', 'China', 'Russia', 5, 1, 1, 'null'),(121, 'In which Mountain Range is Mount Everest?', 'The Himalayas', 'Rocky Mountain', 'The Alps', 'Andes', 5, 1, 1, 'null'),(122, 'Which of the following is the longest river in the World?', 'Nile', 'Amazon', 'Ganga', 'Thames', 5, 1, 1, 'null'),(123, 'Which city is situated on two continents?', 'Istanbul', 'Singapore', 'New Mexico', 'Milan', 5, 2, 1, 'null'),(124, 'Which of the following sea separates Europe from Africa?', 'Mediterranean Sea', 'Arabian Sea', 'Black Sea', 'Caribbean Sea', 5, 2, 1, 'null'),(125, 'Which is the largest Capital City in the World by Population?', 'Tokyo', 'New Delhi', 'Hong Kong', 'New York', 5, 2, 1, 'null'),(126, 'Which Italian city is famous for its Canals?', 'Venice', 'florence', 'Rome', 'Milan', 5, 3, 1, 'null'),(127, 'Which desert is located in Central Asia', 'Gobi Desert', 'Sahara Desert', 'Thar Desert', 'Arabian Sea', 5, 3, 1, NULL),(128, 'Which canal divides North America and South America?', 'Panama Canal', 'Suzhou Canal', 'Suez Canal', 'Stockholm Canal', 5, 3, 1, 'null'),(129, 'Which car is manufactured by a German company?', 'BMW', 'Nissan', 'TOYOTA', 'HONDA', 6, 1, 1, NULL),(130, 'Which company manufactures the famous R8? ', 'AUDI', 'BMW', 'TOYOTA', 'HONDA', 6, 1, 1, NULL),(131, 'Which company is famous for its Electric cars? ', 'TESLA', 'NISSAN', 'AUDI', 'TOYOTA', 6, 1, 1, 'null'),(132, 'Which company is the luxury vehicle marque of Honda?', 'ACURA', 'NISSAN', 'AUDI', 'ALFA ROMEO', 6, 2, 1, NULL),(133, 'Which brand is a subsidiary of BMW?', 'ROLLS ROYCE', 'McLAREN', 'FERRARI', 'BENTLEY', 6, 2, 1, NULL),(134, 'Which brand is owned by an American company that manufactures agricultural heavy equipment?', 'JOHN DERRE', 'DUCATI', 'MUSTANG', 'FERRARI', 6, 2, 1, NULL),(135, 'When was Scuderia Ferrari Founded?', '1929', '1945', '1939', '1937', 6, 3, 1, 'null'),(136, 'Which among these is the fastest category of cars?', 'Dragesters', 'F1', 'SUV', 'Sports Cars', 6, 3, 1, 'null'),(137, '______ is a French automotive manufacturer, part of Groupe PSA', 'Peugot', 'Pagani', 'GTA Spano', 'Ferrari', 6, 3, 1, NULL);"
        // db.transaction(function(tx) {
        //             tx.executeSql(
        //               questionsInserts,
        //               [],
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /View Questions
      db.transaction(tx => {
            tx.executeSql('SELECT * FROM question ', [], (tx, results) => {
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

  handleUsername = (text) => {
    this.setState({username: text});
    //console.log(text);
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
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'red'
  },
  form: {
    flex: 3,
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
  }
});
