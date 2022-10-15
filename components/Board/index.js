import React,{useState} from 'react'
import Tile from '../Tile'
import styles from './styles.module.css'

const Board = ({gameBoard}) => {

    return (
        <div className={styles.board}>
            {gameBoard.map((row,index)=>{
                return (
                    <div key={index} style={{display:'flex',flexDirection:'row'}}>
                        {row.map((content)=> {return (<Tile key={Math.floor(Math.random()*1000000)} mine={content}/>)})}
                    </div>
                )
                })}
        </div>
    )
}

export default Board