import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import Flashcard from './components/flashcard/Flashcard';
import SideBar from './components/sidebar/SideBar';
import LowerButtons from './components/lower-buttons/LowerButtons';
import dataSet from './assets/flashcards.json';
import iFlashcard from './interfaces/iFlashcard';
import { BsShuffle } from 'react-icons/bs';


function App() {
  const [questions, setQuestions] = useState<iFlashcard[]>([new iFlashcard]);
  const [currentQuestion, setCurrentQuestion] = useState<iFlashcard>(questions[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [category, setCategory] = useState('none');
  const [knowledgeLevel, setKnowledgeLevel] = useState('5');

  useEffect(() => {
    setQuestions(dataSet);
  }, [])
  
  /**
   * Method call to change to the next page. 
   * @updates flipped, currentIndex, currentQuestion
   */
  const next = () => {
    if (currentIndex < questions.length - 1) {
      setFlipped(false);
      setCurrentIndex(currentIndex + 1);
      const temp = questions[currentIndex + 1];
      setCurrentQuestion(temp);
    }
  }

  /**
   * Method call to change to the previous page.
   * @updates flipped, currentIndex, currentQuestion
   */
  const back = () => {
    if (currentIndex > 0) {
      setFlipped(false);
      setCurrentIndex(currentIndex - 1);
      setCurrentQuestion(questions[currentIndex - 1]);
    }
  }

  /**
   * Method call to change the current question to the selected question from table of contents.
   * @param location the question to be navigated to
   * @updates flipped, currentIndex, currentQuestion
   */
  const getNav = (location: string) => {
    setFlipped(false);
    setCurrentIndex(Number(location) - 1);
    setCurrentQuestion(questions[Number(location) - 1]);
  }

  /**
   * Method call to flip the current question.
   * @updates flipped
   */
  const revealAnswer = () => {
    if (!flipped) {
      setFlipped(true);
    } else {
      setFlipped(false);
    }
  }

  /**
   * Updates the knowledge level of the current question.
   * @param level the new knowledge level to be assigned
   * @udpates currentQuestion
   */
  const assignKnowledge = (level: string) => {
    const temp = questions[currentIndex];
    temp.knowledgeLevel = level
    setCurrentQuestion(() => ({ ...temp }));
    questions[currentIndex].knowledgeLevel = level;
  }

  /**
   * Method call to handle enter key press and change to next question.
   * @param event keyboard event used to check if button was 'enter'
   * @updates flipped, currentIndex, currentQuestion
   */
  // const handleEnter = (event: KeyboardEvent) => {
  //   if (event.key === 'Enter') {
  //     if (!flipped) {
  //       setFlipped(true);
  //     } else {
  //       if (currentIndex < questions.length - 1) {
  //         setFlipped(false);
  //         setCurrentIndex(currentIndex + 1);
  //         setCurrentQuestion(questions[currentIndex + 1]);
  //       }
  //     }
  //   }
  // }

  /**
   * Method call to filter questions list by category.
   * @param e event from select element
   * @updates questions
   */
  const filterQuestions = (e: ChangeEvent<HTMLSelectElement>, type: string) => {
    let filterRes = dataSet;
    switch (type) {
      case 'category':
        if (e.target.value !== 'none') {
          filterRes = dataSet
            .filter((item: iFlashcard) => item.category === e.target.value)
            .filter((item: iFlashcard) => item.knowledgeLevel <= knowledgeLevel);
          setCategory(e.target.value);
        }
        break;
      case 'knowledge':
        filterRes = dataSet
          .filter((item: iFlashcard) => item.category === category)
          .filter((item: iFlashcard) => item.knowledgeLevel <= e.target.value);
        setKnowledgeLevel(e.target.value);
        break;
      default:
        break;
    }
    if (filterRes.length !== 0) {
      setQuestions(filterRes);
    }
    setCurrentIndex(0);
    setCurrentQuestion(questions[0]);
  }

  /**
   * Method to randomize the filtered list of questions
   * @updates currentIndex, questions, currentQuestion
   */
  const randomizeQuestions = () => {
    setCurrentIndex(0)
    const temp = questions;
    let i = temp.length;

    while (i != 0) {
      let j = Math.floor(Math.random() * i);
      i--;

      [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    setQuestions(() => ([...temp]));
    setCurrentQuestion(questions[0]);
    
  }

  return (
    <>
      <header className='page-header'>
        <section className='header-filter-section' id='header-filter-section'>
          <select className='filter-select' onChange={(e) => filterQuestions(e, 'category')} title='Filter by Category' id='category-filter'>
            <option value="none">No Category Filter</option>
            <option value="fundamentals">Fundamentals</option>
            <option value="frontend">Frontend</option>
            <option value="dsa">DSA</option>
            <option value="general" >General</option>
          </select>
          <select className='filter-select' onChange={(e) => filterQuestions(e, 'knowledge')} title='Filter by Knowledge Level' id='knowledge-filter'>
            <option value="5">All knowledge levels</option>
            <option value="4">4's and below</option>
            <option value="3">3's and below</option>
            <option value="2">2's and below</option>
            <option value="1">Only 1's</option>
          </select>
        </section>
        <section className='header-buttons-section' id='header-buttons-section'>
          <button className='header-button' onClick={randomizeQuestions} title='Randomize Questions'><BsShuffle size = '24'/></button>
          {/* <button className='card'>Style Tester</button> */}
        </section>
        
      </header>
      <main className="main-container">
        <section id='sidebar-section'>
          <SideBar pQuestions={questions} pNav={getNav} pCurrentIndex={currentIndex}></SideBar>
        </section>
        <section id='flashcard-parent-section' className='flashcardParent'>
          <section id='flashcard-section'>
            <Flashcard pQuestions={questions} pCurrentIndex={currentIndex} pCurrentQuestion={currentQuestion} pFlipped={flipped} pRevealAnswer={revealAnswer}></Flashcard>
          </section>
          <section id='lower-buttons-section'>
            <LowerButtons pRevealAnswer={revealAnswer} pAssignKnowledge={assignKnowledge} pBack={back} pNext={next}></LowerButtons>
          </section>
        </section>
      </main>
      <footer>
        
      </footer>
    </>
  );
  
}

export default App
