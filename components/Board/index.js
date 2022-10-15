import React,{useState, useContext} from 'react'
import Row from '../Row'
import styles from './styles.module.css'
import gameContext from '../../context/gameContext'

const Board = ({gameBoard}) => {

    const{state,dispatch} = useContext(gameContext)

    return (
        <div className={styles.board}>
            <div>
                <h4>Flags left: {state.flagsLeft}</h4>
            </div>
            {gameBoard.map((row,index)=>{
                return <Row tiles={row} key={index} />
                })}
            <button onClick={(()=>{console.log(gameContext)})}>test</button>
        </div>
    )
}

export default Board