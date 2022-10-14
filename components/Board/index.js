import React,{useState} from 'react'
import Row from '../Row'
import styles from './styles.module.css'

const Board = ({gameBoard}) => {

    return (
        <div className={styles.board}>
            {gameBoard.map((row,index)=>{
                return <Row tiles={row} key={index} />
                })}
        </div>
    )
}

export default Board