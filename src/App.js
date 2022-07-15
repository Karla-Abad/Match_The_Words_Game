import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {

  const [chosenLevel, setChosenLevel] = useState(null);
  const [words, setWords] = useState(null);
  const [correctAnswers, setCorrectAnswers]=useState([]);
  const [clicked, setClicked] = useState([])
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([])

  const getRandomWords = () => {
    const options = {
      method: 'GET',
      url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
      params: {level: chosenLevel, area: 'sat'},
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'twinword-word-association-quiz.p.rapidapi.com'
      }
    };
    
    axios.request(options).then((response)=> {
      console.log(response.data);
      setWords(response.data)
    }).catch((error)=> {
      console.error(error);
    });
  }

  console.log(words && words.quizlist)

  useEffect(()=>{
    if(chosenLevel){
      getRandomWords()
    }
  }, [chosenLevel])

  const checkAnswer = (answer, answerIndex, correctAnswer) => {
    console.log(answerIndex, correctAnswer)
    if (answerIndex == correctAnswer){
      setCorrectAnswers([...correctAnswers, answer])
      setScore((score)=> score+1)
    } else{
      setWrongAnswers([...wrongAnswers, answer])
      setScore((score)=> score-1)
    }
    setClicked([...clicked, answer])

  }

  console.log("correct answers:", correctAnswers)

  console.log("clicked", clicked)

  console.log("wrong answers:", wrongAnswers)


  return (
    <div className="app">
      {!chosenLevel && <div className="level-selector">
        <h1>Match The Words Game</h1>
        <p>Select Your Level To Start!</p>
        <select 
          name="levels" 
          id="levels" 
          value={chosenLevel} 
          onChange={(e)=>setChosenLevel(e.target.value)}>
          <option value="null">Select a Level</option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
          <option value="4">Level 4</option>
          <option value="5">Level 5</option>
          <option value="6">Level 6</option>
          <option value="7">Level 7</option>
          <option value="8">Level 8</option>
          <option value="9">Level 9</option>
          <option value="10">Level 10</option>
      </select>
      </div>}

      {chosenLevel && words && <div className="question-area">
        <h1>Welcome To Level: {chosenLevel}</h1>
        <h3>Your Score Is: {score}</h3>

        <div className="questions">
        {words.quizlist.map((question, _questionIndex) => (
          <div key={_questionIndex} className="question-box">
            {question.quiz.map((word, _index) => (
              <p key={_index}>{word}</p>
            ))}
            
            <div className="question-buttons">
            {question.option.map((answer, answerIndex) => (
              <div key={answerIndex} className="question-button">
                <button 
                disabled={clicked.includes(answer)}
                onClick={()=>checkAnswer(answer, answerIndex+1, question.correct)}
                >{answer}</button>
                {correctAnswers.includes(answer)? <p className="correct">CORRECT!</p> : null}
                {wrongAnswers.includes(answer)? <p className="wrong">WRONG!</p> : null}
              </div>
            ))}
            </div>
          </div>
        ))}
        </div>

            <button onClick={()=>setChosenLevel(null)}>Go Back</button>

      </div>}
    </div>
  );
}

export default App;
