import React, {useState, useEffect } from 'react';
import aa from './Images/SP_Loader_2.gif'

export default function SPLoader() {

    const [text, setText] = useState('')
    const [showImg, setShowImg] = useState(true)
    
    useEffect(() => {
        setTimeout(() => {
            setShowImg(false)
        }, 8000)
    }, [])

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Fetching Data...</p>
                {showImg ? (<img src={aa} style={{ width: '60px', height: '60px' }}/>) : ( <h3>{text}</h3>)}
            </div>
        </>
    )
}