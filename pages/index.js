import styles from "../styles/Home.module.css";
import { useState, useReducer } from "react";
import Board from "../components/Board";
import getAdjacent from "../funcs/getAdjacent";

export default function Home() {
  function reducer(state, action) {
    switch (action.type) {
      case "newGame": {
        return { ...state, settings: true };
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
        return { ...state, game: game, settings: false };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    settings: true,
    width: 3,
    height: 3,
    mines: 3,
    game: [
      ["M", 2, 1],
      [3, "M", 2],
      [2, "M", 2],
    ],
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
        <div className="settings">
          <label>Width: </label>
          <input
            type="number"
            min={3}
            max={15}
            name="width"
            value={state.width}
            onChange={(e) => handleChange(e)}
          />
          <label>Height: </label>
          <input
            type="number"
            min={3}
            max={15}
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
          <button
            onClick={() => {
              dispatch({ type: "createGame" });
            }}
          >
            Create Game
          </button>
        </div>
      </main>
    );
  } else {
    return (
      <main className={styles.main}>
        <Board gameBoard={state.game}></Board>

        <button
          onClick={() => {
            dispatch({ type: "newGame" });
          }}
        >
          New Game
        </button>
      </main>
    );
  }
}
