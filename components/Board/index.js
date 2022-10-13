import React from 'react'
import Tile from '../Tile'
import styles from './styles.module.css'

const Board = ({gameBoard}) => {

    return (
        <div className={styles.board}>
            {gameBoard.map((isMine,index)=>{
                return <Tile key={index} mine={isMine}/>
                })}
        </div>
    )
}

export default Board