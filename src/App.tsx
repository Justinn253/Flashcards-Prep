import { KeyboardEvent, useState } from 'react';
import Flashcard from './components/Flashcard';
import SideBar from './components/SideBar';
import dataSet from './assets/flashcards.json';

function App() {
  const [questions, setQuestions] = useState(dataSet);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  
  const next = () => {
    if (currentIndex < questions.length - 1) {
      setFlipped(false);
      setCurrentIndex(currentIndex + 1);
      const temp = questions[currentIndex + 1];
      setCurrentQuestion(temp);
    }
  }

  const back = () => {
    if (currentIndex > 0) {
      setFlipped(false);
      setCurrentIndex(currentIndex - 1);
      setCurrentQuestion(questions[currentIndex - 1]);
    }
  }

  const revealAnswer = () => {
    if (!flipped) {
      setFlipped(true);
    } else {
      setFlipped(false);
    }
  }

  const assignKnowledge = (level: string) => {
    const temp = questions[currentIndex];
    temp.knowledgeLevel = level
    setCurrentQuestion(currentQuestion => ({
      ...currentQuestion,
      ...temp
    }));
    questions[currentIndex].knowledgeLevel = level;
  }

  const getNav = (location: string) => {
    setFlipped(false);
    setCurrentIndex(Number(location) - 1);
    setCurrentQuestion(questions[Number(location) - 1]);
  }

  const handleEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (!flipped) {
        setFlipped(true);
      } else {
        if (currentIndex < questions.length - 1) {
          setFlipped(false);
          setCurrentIndex(currentIndex + 1);
          setCurrentQuestion(questions[currentIndex + 1]);
        }
      }
    }
  }

  return (
    <div onKeyDown={handleEnter}>
      <div className="main-container">
        <SideBar questions={questions} nav={getNav}></SideBar>
        <div>
          <div className="flash-container" onClick={revealAnswer} tabIndex={0}>
            <div className="title-container">
              <div className="flash-title">
                ({ currentQuestion.knowledgeLevel }) { questions[currentIndex].title }
              </div>
              <div className='flash-subject'>
                { questions[currentIndex].subject } | { currentIndex + 1 } / { questions.length }
              </div>
            </div>
            <div className="line-break"></div>
            <div className={flipped ? 'flash-content' : ''} hidden={!flipped}>
              {questions[currentIndex].definition.map((item: string) => {
                return <li key={item}>{item}</li>
              })}
            </div>
            <div className={flipped ? '' : 'flash-content-hidden'} hidden={flipped}>
              <div>Flip to reveal answer</div>
            </div>
          </div>
          <div className="lower-buttons-container">
            <div className="ratings-container">
              <button className="rating-button lowest" onClick={() => assignKnowledge('1')}>1</button>
              <button className="rating-button low" onClick={() => assignKnowledge('2')}>2</button>
              <button className="rating-button medium" onClick={() => assignKnowledge('3')}>3</button>
              <button className="rating-button high" onClick={() => assignKnowledge('4')}>4</button>
              <button className="rating-button highest" onClick={() => assignKnowledge('5')}>5</button>
            </div>
            <div className="actions-container">
              <button className="action-button" onClick={revealAnswer}>Flip</button>
              <button className="action-button" onClick={back}>Back</button>
              <button className="action-button" onClick={next}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default App
