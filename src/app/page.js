'use client'
import React from 'react'
import {useState} from 'react'
import Image from 'next/image';

export default function Home() {
  const [flips, setFlips] = useState(0)
  const [streak, setStreak] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [coinState, setCoinState] = useState("heads")

  const coinClick = () => {
    setFlips(flips+1)
    let flip = Math.random()
    console.log(`Flip: ${flip} ${flip>.5 ? "heads" : "tails"}`)
    if (flip > .5) {
      setCoinState("heads")
      setStreak(streak+1)
      if (streak+1 > highScore) { setHighScore(streak+1) }
    }
    else {
      setStreak(0)
      setCoinState("tails")
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
