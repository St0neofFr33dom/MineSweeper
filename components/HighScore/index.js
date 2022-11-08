import {useState, useEffect} from 'react'
import { getItem } from '../../funcs/localStorage'

const HighScore = (difficulty) => {
    
const [score,setScore] = useState('0')

    useEffect(()=>{
        setScore(getItem(difficulty))
    },[difficulty])
    return (
            <>
                <h3>Hi-Score</h3>
                <h3>{score}</h3>
            </>
    )
}

export default HighScore