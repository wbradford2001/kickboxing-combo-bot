"use client";

import React, { useEffect, useState } from 'react';
import { getSpeech } from './polly'; // Import the Polly function

const straights: string[] = ["1", "2"];
const left_punches: string[] = ["1","3", "5"];
const right_punches: string[] = ["2","6"];

interface Checks {
  [key: string]: string[];
}

const checks: Checks = {
  'check leg kick': [...left_punches, ...right_punches, "left low kick", "right low kick"],
  'slip left': left_punches,
  'slip right': right_punches,
  'perry jab': [...left_punches, ...right_punches],
};

const left_kicks: string[] = [
  "left low kick",
  "left mid kick",
  "right low kick",
];

const right_kicks: string[] = [
  "right low kick",
  "right mid kick",
];

const one_offs: string[] = [
  "right low kick",
  "side kick",
  "back kick",
  "front teep",
  "back teep",
  "left head kick",
  "right head kick",
];

const getRandomKey = <T,>(obj: { [key: string]: T }): string => {
  const keys = Object.keys(obj);
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
};

const getRandomElement = <T,>(arr: T[]): T => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

const getRandomOneOrZero = (): number => Math.floor(Math.random() * 2);

const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateCombos = (): string => {
  let combo: string[] = [];
  if (!getRandomInt(0, 5)){
    combo.push(getRandomElement(one_offs));
    if (getRandomOneOrZero() && (combo[combo.length - 1] != "back kick")){
      combo.push(getRandomElement(one_offs))
    };

    return combo.join(', ');;
  }

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
      for (let i = 1; i < 51; i++) {
        let combo = generateCombos();
        console.log(i, combo);
        if (i % 5 == 0){
          console.log("")
        }
        //const audioUrl = await getSpeech(combo, 'x-fast');
        //const audio = new Audio(audioUrl);

        //for (let j = 0; j < 3; j++) {
          //audio.play();
          //await sleep(5000);
        //}
        //await sleep(2000);
      }
    } catch (error) {
      console.error('Error synthesizing speech:', error);
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to synthesize"
      />
      <button onClick={handleClick}>Synthesize Speech</button>
    </div>
  );
};

export default TextToSpeech;
