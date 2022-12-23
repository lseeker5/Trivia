import './Question.css'
import React from 'react'

export default function Question(props){
    let options=[...props.question.incorrectAnswers]  
    let index=Math.round(3*Math.random())
    let correctAnswer=props.question.correctAnswer
    options.splice(index,0,correctAnswer)
    const onClick=props.onClick
    let parentId=props.question.id
    
    
    
    return(
        <div className='overall-question'>
            <h1>{props.question.question}</h1>
            <div className='options' id={parentId}>
                <p className='option first'  onClick={(event)=>{onClick(event)}}>{options[0]}</p>
                <p className='option second'  onClick={(event)=>{onClick(event)}}>{options[1]}</p>
                <p className='option third'  onClick={(event)=>{onClick(event)}}>{options[2]}</p>
                <p className='option fourth'  onClick={(event)=>{onClick(event)}}>{options[3]}</p>
            </div>
            
        </div>
    )
}