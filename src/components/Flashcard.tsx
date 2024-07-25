const Flashcard = ({pQuestions, pCurrentIndex, pCurrentQuestion, pFlipped, pRevealAnswer}: any) => {

  return (
    <div className="flash-container" onClick={() => pRevealAnswer()} tabIndex={0}>
      <div className="title-container">
        <div className="flash-title">
          ({ pCurrentQuestion.knowledgeLevel }) { pQuestions[pCurrentIndex].title }
        </div>
        <div className='flash-subject'>
          { pQuestions[pCurrentIndex].subject } | { pCurrentIndex + 1 } / { pQuestions.length }
        </div>
      </div>
      <div className="line-break"></div>
      <div className={pFlipped ? 'flash-content' : ''} hidden={!pFlipped}>
        {pQuestions[pCurrentIndex].definition.map((item: string) => {
          return <li key={item}>{item}</li>
        })}
      </div>
      <div className={pFlipped ? '' : 'flash-content-hidden'} hidden={pFlipped}>
        <div>Flip to reveal answer</div>
      </div>
    </div>
  )
}

export default Flashcard;