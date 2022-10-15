import React,{useState, useContext} from 'react'
import Tile from '../Tile'
import styles from './styles.module.css'
import gameContext from '../../context/gameContext'

const Board = () => {


    const{state,dispatch} = useContext(gameContext)

    const gameBoard = state.game

    return (
        <div className={styles.board}>
            <div>
                <h4>Flags left: {state.flagsLeft}</h4>
            </div>
            {gameBoard.map((row,i)=>{
                return(
                    <div key={`r${i}`} style={{display:'flex', flexDirection:'row'}}>
                        {row.map((content,j)=> {return <Tile key={`t${i}${j}`} content={content}/>})}
                    </div>
                ) 
                })}
            <button onClick={(()=>{console.log(state)})}>test</button>
        </div>
    )
}

export default Board