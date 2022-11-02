import createGame from "./createGame";

export default function reducer(state, action) {
  let parameter = action.field
  switch (action.type) {
    case "newGame": {
      return { ...state, gameStatus: "settings" };
    }
    case "gameOver":
      return { ...state, gameStatus: "gameOver" };
    case "victory":
      return {...state, gameStatus: "victory"}
    case "difficulty": {
      switch (action.value) {
        case "easy":
          return {
            ...state,
            difficulty: action.value,
            width: 7,
            height: 7,
            mines: 10,
          };
        case "medium":
          return {
            ...state,
            difficulty: action.value,
            width: 12,
            height: 12,
            mines: 60,
          };
        case "hard":
          return {
            ...state,
            difficulty: action.value,
            width: 20,
            height: 20,
            mines: 120,
          };
        case "custom":
          return { ...state, difficulty: action.value };
        default:
          return state;
      }
    }
    case "createGame":
      let game = createGame(state);
      let key = Math.floor(Math.random() * 1000000);
      return {
        ...state,
        game: game,
        gameStatus: "playing",
        flagsLeft: state.mines,
        boardKey: key,
        time: 0,
        clicks: 0,
      };
    case "changeValue":
      return { ...state, [parameter]: action.value };
    case "decrement":
      return { ...state, [parameter]: state[parameter] - 1 };
    case "increment":
      return { ...state, [parameter]: state[parameter] + 1 };
    case "changeTile":
      let newGrid = [...state.game]
      let targettedTile = newGrid[action.row][action.column]
      newGrid[action.row][action.column] = {...targettedTile,status:action.status}
      return {...state, game:newGrid}
    default:
      console.log("Unknown command");
      return state;
  }
}
