import React, {useState} from 'react'
import styles from './style.module.css'

const Tile = ({mine}) => {

    const [tileContent,setTileContent] = useState()

    const [tileStyle,setTileStyle] = useState({color:'black'})

    function reveal(e){
        if(e.target.dataset.status !== 'unclicked'){return}
        if(e.target.dataset.content === 'M'){
                e.target.className = styles.mine
                e.target.dataset.status = 'clicked'
                setTileContent(e.target.dataset.content)
                return
        }
        e.target.className = styles.tile
        let textColour = getColour(e.target.dataset.content)
        setTileStyle(textColour)
        e.target.dataset.status = 'clicked'
        setTileContent(e.target.dataset.content)
        return
        
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

    function getColour(content){
        switch(content){
            case '0': return {color:"aqua"}
            case '1': return {color:"#000"}
            case '2': return {color:"#909"}
            case '3': return {color:"#009"}
            case '4': return {color:"#090"}
            case '5': return {color:"#990"}
            case '6': return {color:"#940"}
            case '7': return {color:"#900"}
            case '8': return {color:"#904"}
            case 'M': return {color:"#000"}
            default: console.log('Error')
        }
    }

    return (
        <div className={styles.unclicked} style={tileStyle} onClick={(e)=>{reveal(e)}} onContextMenu={(e)=>{mark(e)}} data-content={mine} data-status='unclicked'>
            {tileContent}
        </div>
    )
}

export default Tile