export default function startClick(gameGrid) {
    let chain = 0
    let emptyRowChains = []
    for (let i = 0; i < gameGrid.length; i++){
        let row = []
        for (let j = 0; j < gameGrid[i].length; j++){
            if (gameGrid[i][j]["content"] === "M"){
                if (chain !== 0){
                    row.push(chain)
                    chain = 0
                }
                row.push(-1)
            } else {
                chain++
            }
        }
        if (chain !== 0){
            row.push(chain)
            chain = 0
        }
        emptyRowChains.push(row)
    }
    return emptyRowChains
}