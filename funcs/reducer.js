import getAdjacent from "./getAdjacent";

export default function reducer(state, action) {
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