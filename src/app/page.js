'use client'
import React from 'react'
import {useState} from 'react'
import Image from 'next/image';

export default function Home() {
  const localStorageGet = (key) => {
    return (typeof window !== 'undefined') ? localStorage.getItem(key) : undefined
  }
  const localStorageSet = (key, value) => {
    return (typeof window !== 'undefined') ? localStorage.setItem(key, value) : undefined
  }
  const [flips, setFlips] = useState(0)
  const [streak, setStreak] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [coinState, setCoinState] = useState('heads')

  React.useEffect( ()=> {
    setFlips(+localStorageGet('flips') || 0)
    setStreak(+localStorageGet('streak') || 0)
    setHighScore(+localStorageGet('highScore') || 0)
    setCoinState(localStorageGet('coinState') || 'heads')
  }, [])

  const changeFlips = (amt) => {
    setFlips(amt)
    localStorageSet('flips', amt)
  }

  const changeStreak = (amt) => {
    setStreak(amt)
    localStorageSet('streak', amt)
  }

  const changeHighScore = (amt) => {
    setHighScore(amt)
    localStorageSet('highScore', amt)
  }

  const changeCoinState = (state) => {
    setCoinState(state)
    localStorageSet('coinState', state)
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
