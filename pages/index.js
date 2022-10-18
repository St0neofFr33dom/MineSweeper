import styles from "../styles/Home.module.css";
import { useState, useReducer } from "react";
import Board from "../components/Board";
import reducer from "../funcs/reducer";
import gameContext from "../context/gameContext";

export default function Home() {
  const [state, dispatch] = useReducer(reducer, {
    gameStatus: "settings",
    difficulty: "easy",
    width: 7,
    height: 7,
    mines: 10,
    game: [],
    flagsLeft: 0,
    boardKey: 0,
  });

  function handleChange(e) {
    dispatch({
      type: "changeNumber",
      field: e.target.name,
      value: e.target.value,
    });
  }

  
  if (state.gameStatus === "settings") {
    return (
      <main>
        <h1>Welcome to a Minesweeper-like game!</h1>
        <label forhtml="difficulty">Difficulty: </label>
        <select
          id="difficulty"
          value={state.difficulty}
          name="difficulty"
          onChange={(e) => {
            dispatch({ type: "difficulty", value: e.target.value });
          }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="custom">Custom</option>
        </select>
        {state.difficulty === "custom" && (
          <div className="settings">
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
          </div>
        )}
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
      <gameContext.Provider value={{ state, dispatch }}>
        <main className={styles.main}>
          <Board gameBoard={state.game}></Board>

          <button
            onClick={() => {
              dispatch({ type: "newGame" });
            }}
          >
            New Game
          </button>
          <button onClick={() => {
            dispatch({ type: "createGame" });
          }}>Reset</button>
        </main>
      </gameContext.Provider>
    );
  }
}
