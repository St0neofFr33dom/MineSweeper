import React, {useState} from 'react'
import styles from './style.module.css'

const Tile = ({mine}) => {

    const [tileContent,setTileContent] = useState()

    function reveal(e){
        if(e.target.className !== styles.unclicked){return}
        switch(e.target.dataset.content){
            case 'M':
                e.target.className = styles.mine
                setTileContent(e.target.dataset.content)
                return
            default:
                e.target.className = styles.tile
                setTileContent(e.target.dataset.content)
                return
        }
    }

    return (
        <div className={styles.unclicked} onClick={(e)=>{reveal(e)}} data-content={mine}>
            {tileContent}
        </div>
    )
}

export default Tile