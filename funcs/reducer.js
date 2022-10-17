import createGame from "./createGame";

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
        let game = createGame(state)
        return { ...state, game: game, gameStatus: 'playing', flagsLeft: state.mines };
      case "resetGame":
        let key = Math.floor(Math.random()*1000000)
        return { ...state, game: game, boardKey:key};
      case 'decrementFlag':
        return {...state, flagsLeft: state.flagsLeft - 1}
      case 'incrementFlag':
        return {...state, flagsLeft: state.flagsLeft + 1}
      case 'gameOver':
        return {...state, gameStatus:'gameOver'}
      default:
        console.log('Unknown command')
        return state;
    }
  }