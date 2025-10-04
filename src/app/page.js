'use client'
import React from 'react'
import {useState} from 'react'
import Image from 'next/image';

export default function Home() {
  const [flips, setFlips] = useState(+localStorage.getItem('flips') || 0)
  const [streak, setStreak] = useState(+localStorage.getItem('streak') || 0)
  const [highScore, setHighScore] = useState(+localStorage.getItem('highScore') || 0)
  const [coinState, setCoinState] = useState(localStorage.getItem('coinState') || 'heads')

  const changeFlips = (amt) => {
    setFlips(amt)
    localStorage.setItem('flips', amt)
  }

  const changeStreak = (amt) => {
    setStreak(amt)
    localStorage.setItem('streak', amt)
  }

  const changeHighScore = (amt) => {
    setHighScore(amt)
    localStorage.setItem('highScore', amt)
  }

  const changeCoinState = (state) => {
    setCoinState(state)
    localStorage.setItem('coinState', state)
  }

  const coinClick = () => {
    changeFlips(flips+1)
    if (Math.random() > .5) {
      changeCoinState("heads")
      changeStreak(streak+1)
      if (streak+1 > highScore) { changeHighScore(streak+1) }
    }
    else {
      changeStreak(0)
      changeCoinState("tails")
    }
  } 

  return (
    <div className="flex flex-col bg-amber-200 items-center m-20 pt-5 pb-5">
      <p className="font-serif text-6xl mt-5 text-black pb-10">Coin</p>
      <button onClick={coinClick}>
        <Image src={'/'+coinState+'.png'} width={200 - (coinState==="heads" ? 2 : 0)} height={200 - (coinState==="heads" ? 2 : 0)} alt="coin"></Image>
      </button>
      <p className="font-serif text-lg mt-5 text-black">streak: {streak}</p>
      <p className="font-serif text-lg mt-5 text-black">total: {flips}</p>
      <p className="font-serif text-lg mt-5 text-black">highest streak: {highScore}</p>
    </div>
  );
}
