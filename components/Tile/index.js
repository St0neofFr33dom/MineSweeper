import React, {useState} from 'react'
import styles from './style.module.css'

const Tile = ({mine}) => {

    const [tileContent,setTileContent] = useState()

    function reveal(e){
        if(e.target.dataset.status !== 'unclicked'){return}
        switch(e.target.dataset.content){
            case 'M':
                e.target.className = styles.mine
                e.target.dataset.status = 'clicked'
                setTileContent(e.target.dataset.content)
                return
            default:
                e.target.className = styles.tile
                e.target.dataset.status = 'clicked'
                setTileContent(e.target.dataset.content)
                return
        }
    }


    function mark(e){
        e.preventDefault()
        if(e.target.dataset.status === 'clicked'){return}
        switch(e.target.dataset.status){
            case 'unclicked':
                e.target.dataset.status = 'marked'
                setTileContent("F")
                return
            case 'marked':
                e.target.dataset.status = 'unsure'
                setTileContent("?")
                return
            case 'unsure':
                e.target.dataset.status = 'unclicked'
                setTileContent("")
                return
            default:
                return
        }
    }


    return (
        <div className={styles.unclicked} onClick={(e)=>{reveal(e)}} onContextMenu={(e)=>{mark(e)}} data-content={mine} data-status='unclicked'>
            {tileContent}
        </div>
    )
}

export default Tile