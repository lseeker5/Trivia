import './Question.css'
import React from 'react'

export default function Question(props){
    let options=[...props.question.incorrectAnswers]  
    let index=Math.round(3*Math.random())
    let correctAnswer=props.question.correctAnswer
    options.splice(index,0,correctAnswer)
   
    
    
    return(
        <div className='overall-question'>
            <h1>{props.question.question}</h1>
            <div className='options'>
                <p className='option first'>{options[0]}</p>
                <p className='option second'>{options[1]}</p>
                <p className='option third'>{options[2]}</p>
                <p className='option fourth'>{options[3]}</p>
            </div>
            
        </div>
    )
}