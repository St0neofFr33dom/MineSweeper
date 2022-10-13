import React from 'react'
import Tile from '../Tile'
import styles from './style.module.css'

const Row = ({tiles}) => {
    return (
        <div className={styles.row}>
            {tiles.map((isMine)=>{
                return <Tile key={Math.floor(Math.random()*1000000)} mine={isMine}/>
                })}
        </div>
    )
}

export default Row