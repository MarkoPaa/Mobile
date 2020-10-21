import React, {useState} from 'react';
import {Text, View } from 'react-native';

import styles from './styles/ScreenStyles';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import EndScreen from './screens/EndScreen';
import AddScreen from './screens/AddScreen';
import WinScreen from './screens/WinScreen';

export default function App() {


  const [shouldGameStop, setShouldGameStop]=useState(false);
  const[newGame, setNewGame]=useState(false);
  const[count, setCount]=useState(0);
  const[addWordScreen, setAddWordScreen]=useState(false);
  const[winScreen, setWinScreen]=useState(false)
  const[words, setWords]=useState([]);
  const uri = "https://hangman-291306.appspot.com/rest/hmanservice/getAll";

  const fetchData = async () => {
    let res = null;
    try {
      res=await fetch(uri);
    }
    catch(error){
      setErrors(true);
      console.log(error);
    }
    try {
      const response = await res.json();
      setWords(response);
    }
    catch(err){
      setErrors(true);
      console.log(error);
    }
  }

  if(words.length == 0 || words == null) {
    fetchData();
    console.log(words);
  }
  
  const startGame=()=>{
    fetchData();
    setShouldGameStop(false);
    setNewGame(true);
    setWinScreen(false);
  }
  
  const stopGame=()=>{
    setShouldGameStop(true);
  }

  const winGame=()=>{
    setShouldGameStop(true);
    setWinScreen(true);
  }

  const onExit=()=>{
    setShouldGameStop(false);
    setNewGame(false);
    setAddWordScreen(false);
    setWinScreen(false);
  }

  const startAddWord=()=>{
    setAddWordScreen(true);
  }

  let content=<StartScreen onStartGame={startGame} onNewWord={startAddWord}/>;
  if (newGame == true){
    content=<GameScreen stopGame={stopGame} exitGame={onExit} winGame={winGame} onStartGame={startGame} wordList={words}/>;
  }
  if (shouldGameStop==true){
    content=<EndScreen newGame={startGame} exitGame={onExit}/>;
  }
  if (addWordScreen == true) {
    content=<AddScreen wordExit={onExit} />;
  }
  if (winScreen == true) {
    content=<WinScreen newGame={startGame} exitGame={onExit}/>;
  }
  
  return (
    <View style={styles.screen}>
      {content}
    </View>
  );
}