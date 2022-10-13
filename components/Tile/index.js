import React from 'react'
import styles from './style.module.css'

const Tile = ({mine}) => {

    if (mine === true){
        return (
            <div className={styles.mine}>
                
            </div>
        )
    } else {
        return (
            <div className={styles.tile}>
                
            </div>
        )
    }
}

export default Tile