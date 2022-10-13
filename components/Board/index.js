import React from 'react'
import Tile from '../Tile'
import { useState } from 'react'
import styles from './styles.module.css'

const Board = () => {

    const [mines,setMines] = useState([true,false,false,false,true,false,false,false,false])

    return (
        <div className={styles.board}>
            {mines.map((isMine,index)=>{
                return <Tile key={index} mine={isMine}/>
                })}
        </div>
    )
}

export default Board