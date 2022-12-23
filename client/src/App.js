import StartPage from './StartPage';
import Question from './Question';
import './App.css';
import React from'react'
import Axios from 'axios';

function App() {

  const[onStartPage,setOnStartPage]=React.useState(true)
  const [onQuestionPage,setOnQuestionPage]=React.useState(false)
  const [questions,setQuestions]=React.useState([])
  const[submitted,setSubmitted]=React.useState(false)
  const [score,setScore]=React.useState(0)

  function startQuiz(){
    setOnStartPage(false)
    setOnQuestionPage(true)
  }

  function clickedOption(val){
    const ID=val.target.parentElement.id
    //console.log(ID) ID is there 
    const value=val.target.innerText
    //console.log(value) value is there
    const newQuestions=[...questions]
    for(let i=0;i<newQuestions.length;i++){
      if(newQuestions[i].id===ID){
        newQuestions[i].selectedOption=value
      }
    }
    setQuestions(newQuestions)
    console.log(questions)
  }

  function checkScore(){
    const finalQuestions=[...questions]
    let score=0
    console.log(finalQuestions)
    for(let i=0;i<finalQuestions.length;i++){
      if(finalQuestions[i].selectedOption===finalQuestions[i].correctAnswer){
        score+=1
      }
    }
    setScore(score)
  }

  function handleSubmit(){
    checkScore()
    setOnQuestionPage(false)
    setSubmitted(true)
  }

  React.useEffect(()=>{
    Axios.get("https://the-trivia-api.com/api/questions?limit=5").then((res)=>{
      
      res.data.map((entry)=>{
        let Q={}
        let {id}=entry
        let {question}=entry
        let {correctAnswer}=entry
        let{incorrectAnswers}=entry
        Q.id=id
        Q.question=question
        Q.correctAnswer=correctAnswer
        Q.incorrectAnswers=incorrectAnswers
        setQuestions(prev=>[...prev,Q])
      })
    })
  },[])

  const QuestionPage=questions.map((question)=>{
    //console.log(question) okay so the item being passed down is correct
    return (
      <Question 
      question={question}
      onClick={clickedOption}
      />
    )
  })
    const submitButton=<div className='overall-question'><button onClick={handleSubmit}>SUBMIT</button></div>
  
  

  return (
    <div className="App">
      {onStartPage&&<StartPage onClick={startQuiz} />}
      {onQuestionPage&&QuestionPage}
      {onQuestionPage&&submitButton}
      {submitted&&<h1>{score}</h1>}
    </div>
  );
}

export default App;
