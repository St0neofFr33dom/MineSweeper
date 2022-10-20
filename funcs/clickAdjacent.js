function clickAdjacent(gameGrid,click,row,column){
    if (gameGrid[row - 1] !== undefined) {
        if(gameGrid[row - 1][column - 1] !== undefined){
            click()
        }
    }
}