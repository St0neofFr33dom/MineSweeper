import React, { useState, useContext, useEffect } from "react";
import Tile from "../Tile";
import styles from "./styles.module.css";
import gameContext from "../../context/gameContext";

const Board = () => {
  const { state, dispatch } = useContext(gameContext);

  const gameBoard = state.game;
  const boardKey = state.boardKey;
  const time = state.time

  useEffect(() => {
    switch(state.gameStatus){
      case 'playing':
        const timer = setInterval(() => {
          dispatch({type:'timer'});
        }, 1000);
    
        return () => clearInterval(timer)
      case 'gameOver': return () => clearInterval(timer)
      case 'settings': return () => clearInterval(timer);
      default: return
    }
  },[state.gameStatus,dispatch])

  //   const timer = setInterval(() => {
  //     setTime(time+1);
  //   }, 1000);

  //   return () => clearInterval(timer)
  // }),[state.gameStatus];




  return (
    <div className={styles.board} key={boardKey}>
      <div>
        <h4>Flags left: {state.flagsLeft}</h4>
        <h4>Time: {time}</h4>
      </div>
      {gameBoard.map((row, i) => {
        return (
          <div key={`r${i}`} style={{ display: "flex", flexDirection: "row" }}>
            {row.map((content, j) => {
              return <Tile key={`t${i}${j}`} content={content} />;
            })}
          </div>
        );
      })}
      <button
        onClick={() => {
          console.log(state);
        }}
      >
        test
      </button>
    </div>
  );
};

export default Board;
