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
            {gameBoard.map((row,index)=>{
                return(
                    <div key={Math.floor(Math.random()*1000000)} style={{display:'flex', flexDirection:'row'}}>
                        {row.map((content)=> {return <Tile key={Math.floor(Math.random()*1000000)} content={content}/>})}
                    </div>
                ) 
                })}
            <button onClick={(()=>{console.log(gameContext)})}>test</button>
        </div>
    )
}

export default Board