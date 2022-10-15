import React, {useState, useContext, useCallback} from 'react'
import styles from './style.module.css'
import gameContext from '../../context/gameContext'

const Tile = ({mine}) => {

    const {state,dispatch} = useContext(gameContext) 
    
    const [status,setStatus] = useState('unclicked')

    const [tileContent,setTileContent] = useState()

    function reveal(e){
        if(status !== 'unclicked'){return}
        if(e.target.dataset.content === 'M'){
                e.target.className = styles.mine
                setStatus('clicked')
                setTileContent(e.target.dataset.content)
                return
        }
        e.target.className = styles.tile
        setStatus('clicked')
        setTileContent(e.target.dataset.content)
        return
        
    }


    function mark(e){
        e.preventDefault()
        if(status === 'clicked'){return}
        switch(status){
            case 'unclicked':
                setStatus('marked')
                dispatch({type:'decrementFlag'})
                setTileContent("F")
                return
            case 'marked':
                setStatus('unsure')
                dispatch({type:'incrementFlag'})
                setTileContent("?")
                return
            case 'unsure':
                setStatus('unclicked')
                setTileContent("")
                return
            default:
                return
        }
    }

    function getColour(content){
        switch(content){
            case 0: return {color:"aqua"}
            case 1: return {color:"#000"}
            case 2: return {color:"#909"}
            case 3: return {color:"#009"}
            case 4: return {color:"#090"}
            case 5: return {color:"#990"}
            case 6: return {color:"#940"}
            case 7: return {color:"#900"}
            case 8: return {color:"#904"}
            case 'M': return {color:"#000"}
            default: console.log('Error')
        }
    }

    return (
        <div className={styles.unclicked} style={getColour(mine)} onClick={(e)=>{reveal(e)}} onContextMenu={(e)=>{mark(e)}} data-content={mine}>
            {tileContent}
        </div>
    )
}

export default Tile