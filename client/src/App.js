
import Question from './Question';
import './App.css';
import React from'react'
import Axios from 'axios';
import TriviaLogo from './trivia logo.jpg'

function App() {

  const[onStartPage,setOnStartPage]=React.useState(true)
  const [onQuestionPage,setOnQuestionPage]=React.useState(false)
  const [questions,setQuestions]=React.useState([])
  //submitted does not mean anything is sent to database
  const[submitted,setSubmitted]=React.useState(false)
  const [score,setScore]=React.useState(0)
  //reset means going back to start page
  const[reset,setReset]=React.useState(false)
  const [scoreList,setScoreList]=React.useState([])
  const[username,setUsername]=React.useState("")
  //means new entries are sent into sql
  const[updated,setUpdated]=React.useState(false)

  React.useEffect(()=>{
    Axios.get("http://localhost:3001/get").then((response=>{
      setScoreList(response.data)    
    }))
    
  },[])
  //meant to check if the right data is taken from the database
  React.useEffect(()=>{
    console.log(scoreList)
  },[scoreList])
  
  const updateDatabase=()=>{
    Axios.post('http://localhost:3001/insert',{
      username:username,
      userscore:score
    })
    
     const newScores=setTimeout(() => {
      Axios.get("http://localhost:3001/get").then((response=>{
      setScoreList(response.data)    
    }))
     }, 100);
    }

  function startQuiz(){
    setOnStartPage(false)
    setOnQuestionPage(true)
  }

  function clickedOption(val){
    val.target.classList.add("selected")
    const ID=val.target.parentElement.id
    
    const value=val.target.innerText
    
    const newQuestions=[...questions]
    for(let i=0;i<newQuestions.length;i++){
      if(newQuestions[i].id===ID){
        newQuestions[i].selectedOption=value
      }
    }
    setQuestions(newQuestions)
    
  }

  function checkScore(){
    const finalQuestions=[...questions]
    let score=0
    
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

  function handleReset(){
    setSubmitted(false)
    setOnStartPage(true)
    setReset(prev=>!prev)
    setScore(0)
    setUsername("")
    setUpdated(false)
  }

  function handleChangeInUsername(val){
    setUsername(val.target.value)
  }



  React.useEffect(()=>{
    Axios.get("https://the-trivia-api.com/api/questions?limit=5").then((res)=>{
      setQuestions([])
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
  },[reset])

  const QuestionPage=questions.map((question)=>{
    
    return (
      <Question 
      question={question}
      onClick={clickedOption}
      />
    )
  })
    const submitButton=<div className='submit-button-div'><button className='submit-button' onClick={handleSubmit}>SUBMIT</button></div>
  
    const Scorelist=scoreList.map((score)=>{
      return(
        <tr className='scores'>
          <td className='username'>{score.username}</td>
          <td className='userscore'>{score.userscore}</td>
        </tr>
      )
    })

    const FinalPage=
    <div className='final-page'>
      <div className='final-page-congrats'>
        <p>CONGRATS YOU GOT</p>
        <p>{score}</p>
        <p>POINTS</p>
      </div>
      <button className='final-page-reset final-page-button'onClick={handleReset}>PLAY AGAIN</button>
      <p>ADD YOUR NAME TO THE LEADERBOARDS</p>
      <div className='final-page-inputs'>
        <input className='final-page-username'placeholder="username" onChange={(e)=>{handleChangeInUsername(e)}}></input>
      </div>
      <button className='final-page-send final-page-button'onClick={updateDatabase}>ADD</button>
      <h1>LEADERBOARDS</h1>
      <table className='table'>
        <tr>
          <td className='username'>User</td>
          <td className='userscore'>Score</td>
        </tr>
        {Scorelist}
      </table>
    </div>
  

  return (
    <div className="App">
      {onStartPage&&
      <div className='start-page-full'>
        
        <button className='start-page-button' onClick={startQuiz}>START</button>
        
      </div>
      }
      {onQuestionPage&&QuestionPage}
      {onQuestionPage&&submitButton}
      {submitted&&FinalPage} 
    </div>
  );
}

export default App;
