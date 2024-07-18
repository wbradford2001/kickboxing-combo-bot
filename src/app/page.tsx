"use client";

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

<<<<<<< HEAD


const straights: string[] = [
  "jab",
  "cross"
]
const left_punches: string[] = [
  "jab",
  "jab body",


  "left hook",
  "left hook body",

  "left uppercut",
]


const right_punches: string[] = [
  "cross",
  "cross body",


  "right uppercut",
]
=======
const straights: string[] = ["1", "2"];
const left_punches: string[] = ["1", "1 body", "3", "5"];
const right_punches: string[] = ["2", "2 body", "6"];
>>>>>>> a25ccd7 (fixed security flaw)

interface Checks {
  [key: string]: string[];
}

const checks: Checks = {
<<<<<<< HEAD
  'check leg kick': [...left_punches, ...right_punches],
  'block left body kick': left_punches,
  'block right body kick': right_punches,
  'slip left': left_punches,
  'slip right': right_punches,
  'perry jab': [...left_punches, ...right_punches],
  'perry front teep': right_punches,
  'perry back teep': left_punches,
};


const kicks: string[] = [
  'left low kick',
  'right low kick',
=======
  'check leg kick': [...left_punches, ...right_punches, "left low kick", "right low kick"],
  'slip left': left_punches,
  'slip right': right_punches,
  'perry jab': [...left_punches, ...right_punches],
};

const left_kicks: string[] = [
  "left low kick",
  "left mid kick",
  "left high kick",
  "left teep",
  "left knee"
];

const right_kicks: string[] = [
  "right low kick",
  "right mid kick",
  "right high kick",
  "right teep",
  "right knee"
];
>>>>>>> a25ccd7 (fixed security flaw)

  'right mid kick',
  'left step mid kick',
  'left switch mid kick',

  'right head kick',
  'left step head kick',
  'left switch head kick',  

  'left teep',
  'right teep',

  'side kick',
  'back kick',

<<<<<<< HEAD
  'right knee',
  'left step knee',
  'left switch knee'

]



const Home: React.FC = () => {
  const [rounds, setRounds] = useState(3);
  const [duration, setDuration] = useState(180); // duration in seconds
  const [breakTime, setBreakTime] = useState(60); // break time in seconds
  const [currentRound, setCurrentRound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [combo, setCombo] = useState('');
  const [selectedPunches, setSelectedPunches] = useState<string[]>([]);

  const startSession = () => {
    setCurrentRound(1);
    setTimeLeft(duration);
    generateCombo();
=======
const generateCombos = (): string => {
  let combo: string[] = [];

  if (getRandomOneOrZero()) {
    combo.push(getRandomElement(straights));
  } else {
    const check: string = getRandomKey(checks);
    combo.push(check);
    combo.push(getRandomElement(checks[check]));
  }

  const punch_selection = [left_punches, right_punches];
  let current_index: number;
  if (left_punches.includes(combo[combo.length - 1])) {
    current_index = 1;
  } else if (right_punches.includes(combo[combo.length - 1])) {
    current_index = 0;
  } else {
    current_index = getRandomOneOrZero();
  }

  for (let i = 0; i < getRandomInt(0, 3); i++) {
    combo.push(getRandomElement(punch_selection[current_index]));
    current_index = (current_index + 1) % 2;
  }

  if (current_index === 1) {
    combo.push(getRandomElement(right_kicks));
  } else {
    combo.push(getRandomElement(left_kicks));
  }

  return combo.join(', ');
};

const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState<string>('');

  const handleClick = async () => {
    try {
      for (let i = 0; i < 100; i++) {
        let combo = generateCombos();
        console.log(combo);
        const audioUrl = await getSpeech(combo, 'x-fast');
        const audio = new Audio(audioUrl);

        for (let j = 0; j < 3; j++) {
          audio.play();
          await sleep(5000);
        }
        await sleep(2000);
      }
    } catch (error) {
      console.error('Error synthesizing speech:', error);
    }
>>>>>>> a25ccd7 (fixed security flaw)
  };

  function getRandomKey<T>(obj: { [key: string]: T }): string {
    const keys = Object.keys(obj);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  }
  
  // Function to select a random element from an array
  function getRandomElement<T>(arr: T[]): T {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  function getRandomOneOrZero(): number {
    return Math.floor(Math.random() * 2);
  }  
  function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }  
  const generateCombo = () => {
    let combo: string[] = [];

    if (getRandomOneOrZero()){
      combo.push(getRandomElement(straights))
    } else {
      let check: string = getRandomKey(checks)
      combo.push(check);
      combo.push(getRandomElement(checks[check]));

    }
    const punch_selection = [left_punches, right_punches]
    let current_index: number;
    if (left_punches.includes(combo[combo.length - 1])){
      current_index = 1;
    } else if (right_punches.includes(combo[combo.length - 1])){
      current_index = 0;
    } else {
      current_index= getRandomOneOrZero()
    }
    for (let i = 0; i < getRandomInt(0, 1); i++){

      combo.push(getRandomElement(punch_selection[current_index]))
      current_index = (current_index + 1) % 2
    }

    combo.push(getRandomElement(kicks))    
    setCombo(combo.join(', '));
  };

  useEffect(() => {
    for (let i = 0; i < 100; i++){
      let combo: string[] = [];

      if (getRandomOneOrZero()){
        combo.push(getRandomElement(straights))
      } else {
        let check: string = getRandomKey(checks)
        combo.push(check);
        combo.push(getRandomElement(checks[check]));
  
      }
      const punch_selection = [left_punches, right_punches]
      let current_index: number;
      if (left_punches.includes(combo[combo.length - 1])){
        current_index = 1;
      } else if (right_punches.includes(combo[combo.length - 1])){
        current_index = 0;
      } else {
        current_index= getRandomOneOrZero()
      }
      for (let i = 0; i < getRandomInt(0, 1); i++){
  
        combo.push(getRandomElement(punch_selection[current_index]))
        current_index = (current_index + 1) % 2
      }
  
      combo.push(getRandomElement(kicks))    

      console.log(combo)
    }
    if (currentRound > 0 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft % 10 === 0) { // Random interval logic
          generateCombo();
        }
      }, 1000);
      return () => clearInterval(timer);
    } else if (currentRound > 0 && timeLeft === 0) {
      if (currentRound < rounds) {
        setCurrentRound(currentRound + 1);
        setTimeLeft(breakTime);
      } else {
        setCurrentRound(0); // session complete
      }
    }
  }, [currentRound, timeLeft]);

  // const handlePunchSelection = (punch: string) => {
  //   setSelectedPunches(prev => 
  //     prev.includes(punch) 
  //       ? prev.filter(p => p !== punch) 
  //       : [...prev, punch]
  //   );
  // };


  return (
    <div className={styles.container}>
      <h1 className={styles.heading1}>Kickboxing Tool</h1>
      <div className={styles.form}>
        <label className={styles.label}>Rounds: </label>
        <input type="number" value={rounds} onChange={(e) => setRounds(+e.target.value)} className={styles.inputNumber} />
      </div>
      <div className={styles.form}>
        <label className={styles.label}>Duration per Round (seconds): </label>
        <input type="number" value={duration} onChange={(e) => setDuration(+e.target.value)} className={styles.inputNumber} />
      </div>
      <div className={styles.form}>
        <label className={styles.label}>Break between Rounds (seconds): </label>
        <input type="number" value={breakTime} onChange={(e) => setBreakTime(+e.target.value)} className={styles.inputNumber} />
      </div>
      <div className={styles.form}>
        <label className={styles.label}>Select Punches to Include: </label>
        {/* {punches.map(punch => (
          <div key={punch}>
            <input
              type="checkbox"
              id={punch}
              value={punch}
              checked={selectedPunches.includes(punch)}
              onChange={() => handlePunchSelection(punch)}
              className={styles.checkbox}
            />
            <label htmlFor={punch}>{punch}</label>
          </div>
        ))} */}
      </div>
      <button onClick={startSession} className={styles.button}>Start</button>
      {currentRound > 0 && (
        <div>
          <h2 className={styles.heading2}>Round: {currentRound}</h2>
          <h3 className={styles.heading3}>Time Left: {timeLeft}</h3>
          <h3 className={styles.heading3}>Combo: {combo}</h3>
        </div>
      )}
    </div>
  );
};

export default Home;
