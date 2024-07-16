"use client";

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

const punches = [
  'jab', 
  'cross', 
  'left hook head', 
  'left hook body', 
  'lead uppercut', 
  'rear uppercut'
];

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
  };

  const generateCombo = () => {
    const comboLength = Math.floor(Math.random() * 4) + 2; // combo length between 2 and 5
    const combo = Array.from({ length: comboLength }, () => {
      const randomIndex = Math.floor(Math.random() * selectedPunches.length);
      return selectedPunches[randomIndex];
    }).join(', ');
    setCombo(combo);
  };

  useEffect(() => {
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

  const handlePunchSelection = (punch: string) => {
    setSelectedPunches(prev => 
      prev.includes(punch) 
        ? prev.filter(p => p !== punch) 
        : [...prev, punch]
    );
  };

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
        {punches.map(punch => (
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
        ))}
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
