import styles from "../styles/Home.module.css";
import { useState, useReducer, useContext } from "react";
import Board from "../components/Board";
import getAdjacent from "../funcs/getAdjacent";
import gameContext from "../context/gameContext";

export default function Home() {

  function reducer(state, action) {
    switch (action.type) {
      case "newGame": {
        return { ...state, settings: true };
      }
      case "difficulty": {
        switch(action.value){
          case 'easy': return {...state, difficulty:action.value, width:7,height:7, mines:10}
          case 'medium': return {...state, difficulty:action.value, width:12,height:12, mines:40}
          case 'hard': return {...state, difficulty:action.value, width:20,height:20, mines:80}
          case 'custom': return {...state, difficulty:action.value}
          default: return state
        }
      }
      case "changeNumber":
        return { ...state, [action.field]: action.value };
      case "createGame":
        let minePositions = [];
        let gridSize = state.width * state.height;
        while (minePositions.length < state.mines) {
          let position = Math.floor(Math.random() * gridSize);
          if (!minePositions.includes(position)) {
            minePositions.push(position);
          }
        }
        let gameGrid = [];
        for (let i = 0; i < state.height; i++) {
          let row = [];
          for (let j = 0; j < state.width; j++) {
            row.push(false);
          }
          gameGrid.push(row);
        }
        for (let i = 0; i < minePositions.length; i++) {
          let position = minePositions[i];
          let rowPosition = Math.floor(position / state.width);
          let columnPosition = position % state.width;
          gameGrid[rowPosition][columnPosition] = "M";
        }
        let game = getAdjacent(gameGrid);
        return { ...state, game: game, settings: false, flagsLeft: state.mines };
      case 'decrementFlag':
        return {...state, flagsLeft: state.flagsLeft - 1}
      case 'incrementFlag':
        return {...state, flagsLeft: state.flagsLeft + 1}
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    settings: true,
    difficulty: 'easy',
    width: 7,
    height: 7,
    mines: 10,
    game: [],
    flagsLeft:0,
  });



  function handleChange(e) {
    dispatch({
      type: "changeNumber",
      field: e.target.name,
      value: e.target.value,
    });
  }

  if (state.settings) {
    return (
      <main>
        <h1>Welcome to a Minesweeper-like game!</h1>
        <label forhtml='difficulty'>Difficulty: </label>
        <select id='difficulty' name='difficulty' onChange={(e)=>{dispatch({type:'difficulty',value:e.target.value})}}>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
          <option value='custom'>Custom</option>
        </select>
        {(state.difficulty === 'custom') && <div className="settings">
          <label>Width: </label>
          <input
            type="number"
            min={3}
            max={25}
            name="width"
            value={state.width}
            onChange={(e) => handleChange(e)}
          />
          <label>Height: </label>
          <input
            type="number"
            min={3}
            max={25}
            name="height"
            value={state.height}
            onChange={(e) => handleChange(e)}
          />
          <label>Mines: </label>
          <input
            type="number"
            min={3}
            max={Math.floor((state.width * state.height) / 2)}
            name="mines"
            value={state.mines}
            onChange={(e) => handleChange(e)}
          />
        </div>}
          <button
            onClick={() => {
              dispatch({ type: "createGame" });
            }}
          >
            Create Game
          </button>
      </main>
    );
  } else {
    return (
      <gameContext.Provider value={{state,dispatch,}}>
      <main className={styles.main}>

        <Board gameBoard={state.game}></Board>

        <button
          onClick={() => {
            dispatch({ type: "newGame" });
          }}
        >
          New Game
        </button>
        <button
          onClick={() => {
            dispatch({ type: "createGame" });
          }}
        >
          Reset
        </button>
      </main>
      </gameContext.Provider>
    );
  }
}
