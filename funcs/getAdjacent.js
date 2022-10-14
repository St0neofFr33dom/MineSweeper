

export default function getAdjacent(gameGrid){
    for (let i = 0; i < gameGrid.length; i++){
        for (let j = 0; j < gameGrid[i].length; j++){
          if(gameGrid[i][j] === 'M'){continue};
          let count = 0
          if(gameGrid[i-1] !== undefined){
            if(gameGrid[i-1][j-1] !== undefined && gameGrid[i-1][j-1] === 'M'){
                count++
            }
            if(gameGrid[i-1][j] !== undefined && gameGrid[i-1][j] === 'M'){
                count++
            }
            if(gameGrid[i-1][j+1] !== undefined && gameGrid[i-1][j+1] === 'M'){
                count++
            }
          }
          if(gameGrid[i+1] !== undefined){
            if(gameGrid[i+1][j-1] !== undefined && gameGrid[i+1][j-1] === 'M'){
                count++
            }
            if(gameGrid[i+1][j] !== undefined && gameGrid[i+1][j] === 'M'){
                count++
            }
            if(gameGrid[i+1][j+1] !== undefined && gameGrid[i+1][j+1] === 'M'){
                count++
            }
          }
          if(gameGrid[i][j-1] !== undefined && gameGrid[i][j-1] === 'M'){
            count++
        }
          if(gameGrid[i][j+1] !== undefined && gameGrid[i][j+1] === 'M'){
            count++
        }

          gameGrid[i][j] = count;
        }
      }
      return gameGrid
}