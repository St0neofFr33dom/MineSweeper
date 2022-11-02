export default function clickAdjacent(gameGrid,click,row,column){
    if (gameGrid[row - 1] !== undefined) {
        if(gameGrid[row - 1][column - 1] !== undefined && gameGrid[row - 1][column - 1]["status"] == "unclicked"){
            click(row-1,column-1)
        }
        if(gameGrid[row - 1][column ] !== undefined && gameGrid[row - 1][column ]["status"] == "unclicked"){
            click(row-1,column)
        }
        if(gameGrid[row - 1][column + 1] !== undefined && gameGrid[row - 1][column + 1]["status"] == "unclicked"){
            click(row-1,column+1)
        }
    }
    if (gameGrid[row+1] !== undefined){
        if(gameGrid[row + 1][column - 1] !== undefined && gameGrid[row + 1][column - 1]["status"] == "unclicked"){
            click(row+1,column-1)
        }
        if(gameGrid[row + 1][column ] !== undefined && gameGrid[row + 1][column]["status"] == "unclicked"){
            click(row+1,column)
        }
        if(gameGrid[row + 1][column + 1] !== undefined  && gameGrid[row + 1][column + 1]["status"] == "unclicked"){
            click(row+1,column+1)
        }
    }
    if(gameGrid[row][column-1] !== undefined  && gameGrid[row][column - 1]["status"] == "unclicked"){
        click(row,column-1)
    }
    if(gameGrid[row][column+1] !== undefined  && gameGrid[row][column + 1]["status"] == "unclicked"){
        click(row,column+1)
    }
    return
}