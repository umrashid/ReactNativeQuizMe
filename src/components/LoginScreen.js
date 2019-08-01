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
//       db.transaction(tx => {
//             tx.executeSql('SELECT * FROM user order by user_id ASC', [], (tx, results) => {
//               console.log(results.rows.length);
//               for (let i = 0; i < results.rows.length; ++i) {
//                 console.log(results.rows.item(i));
//               }
//             },
//             (tx, error) => {
//               console.log(error);
//             },
//           );
//           });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      // db.transaction(tx => {
      //       tx.executeSql('SELECT * FROM question ', [], (tx, results) => {
      //         console.log(results.rows.length);
      //         for (let i = 0; i < results.rows.length; ++i) {
      //           console.log(results.rows.item(i));
      //         }
      //       },
      //       (tx, error) => {
      //         console.log(error);
      //       },
      //     );
      //     });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Creating Score_category TABLE
    // db.transaction(function(txn) {
    //     txn.executeSql(
    //     "SELECT name FROM sqlite_master WHERE type='table' AND name='score_category'",
    //       [],
    //       function(tx, res) {
    //         console.log('item:', res.rows.length);
    //         if (res.rows.length == 0) {
    //           txn.executeSql('DROP TABLE IF EXISTS score_category', []);
    //           txn.executeSql(
    //             'CREATE TABLE IF NOT EXISTS score_category(user_id VARCHAR(255) NOT NULL, score int(10) NOT NULL, categoryID int(10) NOT NULL, PRIMARY KEY (user_id, categoryID));',
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
//Creating score_difficulty TABLE
    // db.transaction(function(txn) {
    //     txn.executeSql(
    //     "SELECT name FROM sqlite_master WHERE type='table' AND name='score_difficulty'",
    //       [],
    //       function(tx, res) {
    //         console.log('item:', res.rows.length);
    //         if (res.rows.length == 0) {
    //           txn.executeSql('DROP TABLE IF EXISTS score_difficulty', []);
    //           txn.executeSql(
    //             'CREATE TABLE IF NOT EXISTS score_difficulty(user_id VARCHAR(255) NOT NULL, score int(10) NOT NULL, difficultyID int(10) NOT NULL, PRIMARY KEY (user_id, difficultyID));',
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
//Drop VIEWS

// CREATE VIEWS
db.transaction(function(txn) {
    txn.executeSql(
    "SELECT name FROM sqlite_master WHERE type='view' AND name='leaderboard_category_total'",
      [],
      function(tx, res) {
        console.log('item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP VIEW IF EXISTS leaderboard_category_total', []);
          txn.executeSql(
            'CREATE VIEW leaderboard_category_total as select user_id, sum(score) as totalpoints, categoryID from score_category group by user_id, categoryID order by categoryID ASC, totalpoints DESC, user_id;',
            []
          );
        }
      },
      function(tx, error){
         console.log("DB Failed");
      }
    );
  });
  db.transaction(function(txn) {
      txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='view' AND name='leaderboard_difficulty_total'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP VIEW IF EXISTS leaderboard_difficulty_total', []);
            txn.executeSql(
              'CREATE VIEW leaderboard_difficulty_total as select user_id, sum(score) as totalpoints, difficultyID from score_difficulty group by user_id, difficultyID order by difficultyID ASC, totalpoints DESC, user_id;',
              []
            );
          }
        },
        function(tx, error){
           console.log("DB Failed");
        }
      );
    });
    db.transaction(function(txn) {
        txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='view' AND name='leaderboard_category_average'",
          [],
          function(tx, res) {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP VIEW IF EXISTS leaderboard_category_average', []);
              txn.executeSql(
                'CREATE VIEW leaderboard_category_average as select user_id, avg(score) as totalpoints, categoryID from score_category group by user_id, categoryID order by categoryID ASC, totalpoints DESC, user_id;',
                []
              );
            }
          },
          function(tx, error){
             console.log("DB Failed");
          }
        );
      });
      db.transaction(function(txn) {
          txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='view' AND name='leaderboard_difficulty_average'",
            [],
            function(tx, res) {
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP VIEW IF EXISTS leaderboard_difficulty_average', []);
                txn.executeSql(
                  'CREATE VIEW leaderboard_difficulty_average as select user_id, avg(score) as totalpoints, difficultyID from score_difficulty group by user_id, difficultyID order by difficultyID ASC, totalpoints DESC, user_id;',
                  []
                );
              }
            },
            function(tx, error){
               console.log("DB Failed");
            }
          );
        });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VIEW VIEWS
        db.transaction(tx => {
              tx.executeSql('SELECT * FROM leaderboard_difficulty_total where difficultyID = 2 order by user_id ASC', [], (tx, results) => {
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /View All Tables
      // db.transaction(tx => {
      //       tx.executeSql('SELECT * FROM sqlite_master where type="table" ', [], (tx, results) => {
      //         console.log(results.rows.length);
      //         for (let i = 0; i < results.rows.length; ++i) {
      //           console.log(results.rows.item(i));
      //         }
      //       },
      //       (tx, error) => {
      //         console.log(error);
      //       },
      //     );
      //     });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /View All Views
      // db.transaction(tx => {
      //       tx.executeSql('SELECT * FROM sqlite_master where type="view" ', [], (tx, results) => {
      //         console.log(results.rows.length);
      //         for (let i = 0; i < results.rows.length; ++i) {
      //           console.log(results.rows.item(i));
      //         }
      //       },
      //       (tx, error) => {
      //         console.log(error);
      //       },
      //     );
      //     });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var scoreInsertCategory = "insert into score_category (user_id, score, categoryID) values ('player1', 7, 1); insert into score_category (user_id, score, categoryID) values ('player5', 35, 3); insert into score_category (user_id, score, categoryID) values ('player3', 46, 6); insert into score_category (user_id, score, categoryID) values ('player2', 37, 4); insert into score_category (user_id, score, categoryID) values ('player5', 41, 2); insert into score_category (user_id, score, categoryID) values ('player3', 48, 5); insert into score_category (user_id, score, categoryID) values ('player5', -17, 2); insert into score_category (user_id, score, categoryID) values ('player5', -13, 2); insert into score_category (user_id, score, categoryID) values ('player4', 24, 2); insert into score_category (user_id, score, categoryID) values ('player2', 49, 3); insert into score_category (user_id, score, categoryID) values ('player3', 34, 5); insert into score_category (user_id, score, categoryID) values ('player2', 40, 4); insert into score_category (user_id, score, categoryID) values ('player4', -14, 1); insert into score_category (user_id, score, categoryID) values ('player5', 7, 4); insert into score_category (user_id, score, categoryID) values ('player4', 4, 1); insert into score_category (user_id, score, categoryID) values ('player5', 5, 4); insert into score_category (user_id, score, categoryID) values ('player2', 36, 2); insert into score_category (user_id, score, categoryID) values ('player2', -9, 1); insert into score_category (user_id, score, categoryID) values ('player4', 10, 4); insert into score_category (user_id, score, categoryID) values ('player1', -15, 1); insert into score_category (user_id, score, categoryID) values ('player4', 18, 6); insert into score_category (user_id, score, categoryID) values ('player1', -17, 5); insert into score_category (user_id, score, categoryID) values ('player1', 19, 2); insert into score_category (user_id, score, categoryID) values ('player4', 20, 5); insert into score_category (user_id, score, categoryID) values ('player5', -3, 6); insert into score_category (user_id, score, categoryID) values ('player5', 9, 3); insert into score_category (user_id, score, categoryID) values ('player2', 10, 5); insert into score_category (user_id, score, categoryID) values ('player1', 15, 2); insert into score_category (user_id, score, categoryID) values ('player5', 1, 2); insert into score_category (user_id, score, categoryID) values ('player5', 4, 1); insert into score_category (user_id, score, categoryID) values ('player4', -8, 3); insert into score_category (user_id, score, categoryID) values ('player3', 43, 1); insert into score_category (user_id, score, categoryID) values ('player5', 26, 3); insert into score_category (user_id, score, categoryID) values ('player2', -1, 4); insert into score_category (user_id, score, categoryID) values ('player2', 25, 3); insert into score_category (user_id, score, categoryID) values ('player5', 48, 1); insert into score_category (user_id, score, categoryID) values ('player5', 3, 2); insert into score_category (user_id, score, categoryID) values ('player3', 46, 2); insert into score_category (user_id, score, categoryID) values ('player4', 5, 1); insert into score_category (user_id, score, categoryID) values ('player2', 34, 6); insert into score_category (user_id, score, categoryID) values ('player2', 23, 4); insert into score_category (user_id, score, categoryID) values ('player3', -18, 4); insert into score_category (user_id, score, categoryID) values ('player1', 48, 1); insert into score_category (user_id, score, categoryID) values ('player2', 6, 4); insert into score_category (user_id, score, categoryID) values ('player4', 43, 2); insert into score_category (user_id, score, categoryID) values ('player5', -3, 4); insert into score_category (user_id, score, categoryID) values ('player2', 45, 3); insert into score_category (user_id, score, categoryID) values ('player5', 39, 4); insert into score_category (user_id, score, categoryID) values ('player1', 1, 4); insert into score_category (user_id, score, categoryID) values ('player3', -2, 2); insert into score_category (user_id, score, categoryID) values ('player2', -18, 2); insert into score_category (user_id, score, categoryID) values ('player3', 42, 4); insert into score_category (user_id, score, categoryID) values ('player1', 49, 1); insert into score_category (user_id, score, categoryID) values ('player5', 43, 4); insert into score_category (user_id, score, categoryID) values ('player1', 46, 2); insert into score_category (user_id, score, categoryID) values ('player3', 30, 5); insert into score_category (user_id, score, categoryID) values ('player5', 15, 6); insert into score_category (user_id, score, categoryID) values ('player1', 24, 4); insert into score_category (user_id, score, categoryID) values ('player1', 32, 6); insert into score_category (user_id, score, categoryID) values ('player4', 10, 5); insert into score_category (user_id, score, categoryID) values ('player4', 9, 3); insert into score_category (user_id, score, categoryID) values ('player4', 30, 6); insert into score_category (user_id, score, categoryID) values ('player4', -9, 3); insert into score_category (user_id, score, categoryID) values ('player5', 14, 6); insert into score_category (user_id, score, categoryID) values ('player1', -17, 3); insert into score_category (user_id, score, categoryID) values ('player2', 31, 2); insert into score_category (user_id, score, categoryID) values ('player2', 21, 1); insert into score_category (user_id, score, categoryID) values ('player4', 14, 6); insert into score_category (user_id, score, categoryID) values ('player4', 22, 6); insert into score_category (user_id, score, categoryID) values ('player1', -12, 4); insert into score_category (user_id, score, categoryID) values ('player2', 26, 3); insert into score_category (user_id, score, categoryID) values ('player1', 28, 5); insert into score_category (user_id, score, categoryID) values ('player1', 20, 6); insert into score_category (user_id, score, categoryID) values ('player3', 46, 5); insert into score_category (user_id, score, categoryID) values ('player1', 15, 5); insert into score_category (user_id, score, categoryID) values ('player5', 32, 5); insert into score_category (user_id, score, categoryID) values ('player4', 4, 2); insert into score_category (user_id, score, categoryID) values ('player3', 3, 3); insert into score_category (user_id, score, categoryID) values ('player5', 15, 4); insert into score_category (user_id, score, categoryID) values ('player2', -14, 5); insert into score_category (user_id, score, categoryID) values ('player1', 13, 1); insert into score_category (user_id, score, categoryID) values ('player1', 23, 5); insert into score_category (user_id, score, categoryID) values ('player5', 43, 3); insert into score_category (user_id, score, categoryID) values ('player3', 3, 5); insert into score_category (user_id, score, categoryID) values ('player4', -12, 4); insert into score_category (user_id, score, categoryID) values ('player5', 23, 6); insert into score_category (user_id, score, categoryID) values ('player1', -13, 2); insert into score_category (user_id, score, categoryID) values ('player3', 1, 4); insert into score_category (user_id, score, categoryID) values ('player3', 24, 4); insert into score_category (user_id, score, categoryID) values ('player3', -4, 2); insert into score_category (user_id, score, categoryID) values ('player1', 0, 1); insert into score_category (user_id, score, categoryID) values ('player3', -4, 2); insert into score_category (user_id, score, categoryID) values ('player5', -2, 1); insert into score_category (user_id, score, categoryID) values ('player4', 4, 1); insert into score_category (user_id, score, categoryID) values ('player4', 50, 4); insert into score_category (user_id, score, categoryID) values ('player1', 44, 3); insert into score_category (user_id, score, categoryID) values ('player2', 33, 2); insert into score_category (user_id, score, categoryID) values ('player3', 0, 6); insert into score_category (user_id, score, categoryID) values ('player2', -1, 3); insert into score_category (user_id, score, categoryID) values ('player5', 35, 1);";
// var scoreInsertDifficulty ="insert into score_difficulty (user_id, score, difficultyID) values ('player5', 17, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player1', 22, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player5', -2, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player4', -20, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player2', -6, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player2', 19, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player4', -16, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player4', 19, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player5', 15, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player3', 13, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player3', 37, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player2', 29, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player2', 41, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player4', 12, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player1', -15, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player2', 28, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player3', -7, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player1', 26, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player4', -19, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player5', 46, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player3', 23, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player1', 35, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player1', 28, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player1', 3, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player5', 18, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player3', 16, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player3', -18, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player4', 7, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player3', -2, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player5', -15, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player1', 0, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player2', -6, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player4', 48, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player4', -9, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player3', 17, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player1', 49, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player3', 13, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player3', 4, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player2', -9, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player3', -12, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player2', 9, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player4', -10, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player3', 33, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player4', -6, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player2', -7, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player2', 9, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player5', 33, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player4', -17, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player5', 31, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player2', 14, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player1', -6, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player5', 7, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player3', 47, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player1', -18, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player2', 30, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player4', 37, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player4', 0, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player4', -7, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player3', 32, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player1', 30, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player2', 24, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player1', -13, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player4', -17, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player5', 42, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player2', 32, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player3', 40, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player3', -18, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player3', 6, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player3', 34, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player4', 3, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player2', 29, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player4', 48, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player3', -15, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player4', -11, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player1', -2, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player2', 15, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player4', 23, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player2', -11, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player2', 35, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player3', 1, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player2', 44, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player5', 32, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player3', 32, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player1', 9, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player2', 41, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player1', 15, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player1', 41, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player5', 32, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player3', 18, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player4', 38, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player5', -4, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player5', 42, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player3', 22, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player5', 4, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player2', -2, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player2', 17, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player5', 13, 1); insert into score_difficulty (user_id, score, difficultyID) values ('player2', 23, 2); insert into score_difficulty (user_id, score, difficultyID) values ('player2', 39, 3); insert into score_difficulty (user_id, score, difficultyID) values ('player4', -16, 3);";
//         db.transaction(function(tx) {
//                     tx.executeSql(
//                       scoreInsertDifficulty,
//                       [],
//                       (tx, results) => {
//                         console.log('Results', results.rowsAffected);
//                         if (results.rowsAffected > 0) {
//                           console.log(results.insertId);
//                           console.log("Success");
//                         } else {
//                           console.log('Registration Failed');
//                         }
//                       },
//                       (tx, error) => {
//                         console.log(error);
//                       },
//                     );
//                   });



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
                Actions.MainScreen({
                  username: this.state.username
                });
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
          <Logo heading="Please Sign In" />
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
