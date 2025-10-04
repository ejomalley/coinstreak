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
  const [heads, setHeads] = useState(0)
  const [streak, setStreak] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [tailsStreak, setTailsStreak] = useState(0)
  const [coinState, setCoinState] = useState('heads')
  const [showOdds, setShowOdds] = useState(false)

  const font = "font-serif text-lg mt-5 text-black"

  /*  On page load, attempt to restore saved values.
      If there are no saved values, set to default.  */
  React.useEffect( ()=> {
    setFlips(+localStorageGet('flips') || 0)
    setStreak(+localStorageGet('streak') || 0)
    setHighScore(+localStorageGet('highScore') || 0)
    setCoinState(localStorageGet('coinState') || 'heads')
    setHeads(+localStorageGet('heads') || 0)
    setTailsStreak(+localStorageGet('tailsStreak') || 0)
    setShowOdds(localStorageGet('showOdds') || false)
  }, [])

  /* Change the given value and store it in local storage */
  const changeValue = (which, val) => {
    switch(which) {
      case 'flips': setFlips(val); break
      case 'heads': setHeads(val); break
      case 'streak': setStreak(val); if (val <= highScore) break
      case 'highScore': setHighScore(val); break
      case 'tailsStreak': setTailsStreak(val); break
      case 'coinState': setCoinState(val); break
      case 'showOdds': setShowOdds(val); break
    }

    localStorageSet(which, val)
  }

  /* When "show odds" checkbox is clicked, show/hide component */
  const handleShowOddsBox = (event) => { changeValue('showOdds', event.target.checked) }

  /* When reset button is pressed, return stored values to default */
  const handleResetButton = () => {
    changeValue('flips', 0)
    changeValue('streak', 0)
    changeValue('highScore', 0)
    changeValue('coinState', 'heads')
    changeValue('heads', 0)
    changeValue('tailsStreak', 0)
    changeValue('showOdds', false)
  }

  /* When coin is clicked, flip and adjust values accordingly */
  const coinClick = () => {
    changeValue('flips', flips+1)               // number of flips increases by 1             

    // if coin is heads
    if (Math.random() > .5) {
      changeValue('coinState', 'heads')         // coin state becomes heads (changes coin image)
      changeValue('heads', heads+1)             // number of heads flipped increases by 1
      changeValue('streak', streak+1)           // current heads streak starts or continues
      changeValue('tailsStreak', 0)             // current tails streak ends
    }
    // if tails
    else {
      changeValue('coinState', 'tails')         // coin state becomes tails (changes coin image)
      changeValue('streak', 0)                  // current heads streak ends
      changeValue('tailsStreak', tailsStreak+1) // current tails streak starts or continues
    }
  } 

  return (
    <div className="flex flex-col content-center justify-center w-screen bg-gray-600">
      <div className="flex flex-col bg-amber-200 items-center mt-20 mb-10 p-7 rounded-2xl w-2/3 self-center">
        <p className="font-serif text-6xl mt-5 text-black pb-10">Coin</p>
        <button onClick={coinClick}>
          <Image src={'/'+coinState+'.png'} width={200 - (coinState==="heads" ? 2 : 0)} height={200 - (coinState==="heads" ? 2 : 0)} alt="coin"></Image>
        </button>
        <p className={font}>streak: {streak}</p>
        <p className={font}>total: {flips}</p>
        <p className={font}>highest streak: {highScore}</p>
        <p className={font}>heads ratio: {(heads===0 || flips===0) ? 0 : +((heads/flips)*100).toPrecision(4)}%</p>
        { showOdds ? <p className={font}>odds of next head: { (coinState==='heads') ? +((Math.pow(.5, streak+1))*100).toPrecision(4) : 
          +((1 - (Math.pow(0.5, tailsStreak)))*100).toPrecision(4) }%</p> : null }
      </div>
      <div className='flex self-center items-center pb-10 mb-10'>
        <input type='checkbox' checked={!!showOdds} onChange={handleShowOddsBox}></input>
        <p className='pl-2'>Show Odds</p>
        <button className='bg-gray-50 w-15 self-center ml-40' onClick={handleResetButton}>Reset</button>
      </div>
    </div>
  )
}