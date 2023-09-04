"use client";
import Image from 'next/image'
import { use, useEffect, useState } from 'react';
import Cell from './components/Cell';

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
]

function Home() {
  const [cells, setCells]=useState(["","","","","","","","",""]);
  const [go, setGo]=useState("circle");
  const [winningMsg, setWinningMsg]=useState("");

  useEffect(()=>{
    winningCombos.forEach((combo)=>{
      const circleWins = combo.every((cell)=>cells[cell]==="circle");
      const crossWins = combo.every((cell)=>cells[cell]==="cross");
      if(circleWins){
        setWinningMsg("Circle Wins!");
      } else if (crossWins){
        setWinningMsg("Cross Wins!");
      }
    })
  },[cells, winningMsg]);
   useEffect(()=>{
    if(cells.every((cell)=> cell !== "" && !winningMsg)){
      setWinningMsg("Draw!!!");
    }
  },[cells, winningMsg]);


  console.log(cells);
  return (
    <div className='container'>
      <div className='gameboard'>
        {cells.map((cell, index) => (
          <Cell id = {index} go={go} setGo={setGo} key={index} cells = {cells} setCells = {setCells} cell = {cell} winningMsg = {winningMsg}/>
        ) )}
      </div>
      <div>{winningMsg}</div>
      {!winningMsg && <div>{`It's now ${go} turn!`}</div>}
    </div>
  )
}
export default Home;