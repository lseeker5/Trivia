import './Question.css'
import React from 'react'

export default function Question(props){
    let options=[...props.question.incorrectAnswers]
   
    let index=Math.round(3*Math.random())
    
    let fullOptions=options.splice(index,0,props.question.correctAnswer)
   
    console.log(fullOptions)
    
    return(
        <div>
            <p>test</p>
            <p>{fullOptions[0]}</p>
            <p>{fullOptions[1]}</p>
            <p>{fullOptions[2]}</p>
            <p>{fullOptions[3]}</p>
        </div>
    )
}