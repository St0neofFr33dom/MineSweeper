import React from 'react'
import styles from './style.module.css'

const Tile = ({mine}) => {


    if (mine === 'M'){
        return (
            <div className={styles.mine}>
                M
            </div>
        )
    } else {
        return (
            <div className={styles.tile}>
                {mine}
            </div>
        )
    }
}

export default Tile