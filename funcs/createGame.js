function prepareGrid(state) {
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
  return gameGrid;
}

function getAdjacent(gameGrid) {
  for (let i = 0; i < gameGrid.length; i++) {
    for (let j = 0; j < gameGrid[i].length; j++) {
      if (gameGrid[i][j] === "M") {
        continue;
      }
      let count = 0;
      if (gameGrid[i - 1] !== undefined) {
        if (
          gameGrid[i - 1][j - 1] !== undefined &&
          gameGrid[i - 1][j - 1] === "M"
        ) {
          count++;
        }
        if (gameGrid[i - 1][j] !== undefined && gameGrid[i - 1][j] === "M") {
          count++;
        }
        if (
          gameGrid[i - 1][j + 1] !== undefined &&
          gameGrid[i - 1][j + 1] === "M"
        ) {
          count++;
        }
      }
      if (gameGrid[i + 1] !== undefined) {
        if (
          gameGrid[i + 1][j - 1] !== undefined &&
          gameGrid[i + 1][j - 1] === "M"
        ) {
          count++;
        }
        if (gameGrid[i + 1][j] !== undefined && gameGrid[i + 1][j] === "M") {
          count++;
        }
        if (
          gameGrid[i + 1][j + 1] !== undefined &&
          gameGrid[i + 1][j + 1] === "M"
        ) {
          count++;
        }
      }
      if (gameGrid[i][j - 1] !== undefined && gameGrid[i][j - 1] === "M") {
        count++;
      }
      if (gameGrid[i][j + 1] !== undefined && gameGrid[i][j + 1] === "M") {
        count++;
      }

      gameGrid[i][j] = count;
    }
  }
  return gameGrid;
}

function setStatus(gameGrid){
  return gameGrid.map((row)=>{return row.map((value)=>{return {content:value, status:'unclicked'}})})
} 

export default function createGame(state) {
  let gameGrid = prepareGrid(state);
  let partialGame = getAdjacent(gameGrid);
  let game = setStatus(partialGame)
  return game;
}
