import StartPage from './StartPage';
import Question from './Question';
import './App.css';
import React from'react'
import Axios from 'axios';

function App() {

  const[onStartPage,setOnStartPage]=React.useState(true)
  const [onQuestionPage,setOnQuestionPage]=React.useState(false)
  const [questions,setQuestions]=React.useState([])

  function startQuiz(){
    setOnStartPage(false)
    setOnQuestionPage(true)
  }

  React.useEffect(()=>{
    Axios.get("https://the-trivia-api.com/api/questions?limit=5").then((res)=>{
      
      res.data.map((entry)=>{
        let Q={}
        let {question}=entry
        let {correctAnswer}=entry
        let{incorrectAnswers}=entry
        Q.question=question
        Q.correctAnswer=correctAnswer
        Q.incorrectAnswers=incorrectAnswers
        setQuestions(prev=>[...prev,Q])
      })
    })
  },[])

  const QuestionPage=questions.map((question)=>{
    return (
      <Question question={question}/>
    )
  })
  
  

  return (
    <div className="App">
      {onStartPage&&<StartPage onClick={startQuiz} />}
      {onQuestionPage&&QuestionPage}
    </div>
  );
}

export default App;
