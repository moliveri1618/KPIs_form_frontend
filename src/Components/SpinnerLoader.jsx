import React, {useState, useEffect } from 'react';
import aa from './Images/SP_Loader_2.gif'

export default function SPLoader() {

    const [text, setText] = useState('')
    const [showImg, setShowImg] = useState(true)
    
    useEffect(() => {
        setTimeout(() => {
            setShowImg(false)
        }, 50000)
    }, [])

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Searching DOI ...</p>
                {showImg ? (<img src={aa} style={{ width: '100px', height: '100px' }}/>) : ( <h3>{text}</h3>)}
            </div>
        </>
    )
}