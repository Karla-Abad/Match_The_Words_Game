import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {

  const [chosenLevel, setChosenLevel] = useState("2");
  const [words, setWords] = useState(null)

  const getRandomWords = () => {
    const options = {
      method: 'GET',
      url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
      params: {level: chosenLevel, area: 'sat'},
      headers: {
        'X-RapidAPI-Key': '258f668178mshff6f5fe71f0e9aep1857c4jsn00850b41f96a',
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

  return (
    <div className="App">
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

        {words.quizlist.map((question, questionIndex) => (
          <div className="question-box">
            {question.quiz.map((word, _index) => (
              <p key={_index}>{word}</p>
            ))}
            
            <div className="question-buttons">
            {question.option.map((answer, answerIndex) => (
              <div className="question-button">
                <button>{answer}</button>
              </div>
              
            ))}
            </div>
            

            <p>{question.correct}</p>
          </div>
        ))}

      </div>}
     
    </div>
  );
}

export default App;
