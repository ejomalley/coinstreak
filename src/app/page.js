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

  const [heads, setHeads] = useState(0)
  // const [tails, setTails] = useState(0)
  const [tailsStreak, setTailsStreak] = useState(0)

  const [showOdds, setShowOdds] = useState(false)

  const font = "font-serif text-lg mt-5 text-black"

  React.useEffect( ()=> {
    setFlips(+localStorageGet('flips') || 0)
    setStreak(+localStorageGet('streak') || 0)
    setHighScore(+localStorageGet('highScore') || 0)
    setCoinState(localStorageGet('coinState') || 'heads')
    setHeads(+localStorageGet('heads') || 0)
    setTailsStreak(+localStorageGet('tailsStreak') || 0)
    setShowOdds(localStorageGet('showOdds') || false)
  }, [])

  const changeFlips = (amt) => {
    setFlips(amt)
    localStorageSet('flips', amt)
  }

  const changeHeads = (amt) => {
    setHeads(amt)
    localStorageSet('heads', amt)
  }

  const changeTailsStreak = (amt) => {
    setTailsStreak(amt)
    localStorageSet('tailsStreak', amt)
  }

  const changeStreak = (amt) => {
    setStreak(amt)
    localStorageSet('streak', amt)
    if (amt > highScore) changeHighScore(amt)
  }

  const changeHighScore = (amt) => {
    setHighScore(amt)
    localStorageSet('highScore', amt)
  }

  const changeCoinState = (state) => {
    setCoinState(state)
    localStorageSet('coinState', state)
  }

  const changeShowOdds = (yn) => {
    setShowOdds(yn)
    localStorageSet('showOdds', yn)
  }

  const handleShowOddsBox = (event) => {
    changeShowOdds(event.target.checked)
    console.log("got to handler")
  }

  const handleResetButton = () => {
    changeFlips(0)
    changeStreak(0)
    changeHighScore(0)
    changeCoinState('heads')
    changeHeads(0)
    changeTailsStreak(0)
    changeShowOdds(false)
  }

  const coinClick = () => {
    changeFlips(flips+1)
    if (Math.random() > .5) {
      changeCoinState("heads")
      changeHeads(heads+1)
      changeStreak(streak+1)
      changeTailsStreak(0)
    }
    else {
      changeCoinState("tails")
      changeStreak(0)
      changeTailsStreak(tailsStreak+1)
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
