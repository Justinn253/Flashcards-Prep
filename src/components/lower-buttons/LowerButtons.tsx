import './LowerButtons.css';

const LowerButtons = ({pRevealAnswer, pBack, pNext, pAssignKnowledge}: any) => {

  return (
    <div className="lower-buttons-container">
      <div className="ratings-container">
        <button className="rating-button lowest" onClick={() => pAssignKnowledge('1')}>1</button>
        <button className="rating-button low" onClick={() => pAssignKnowledge('2')}>2</button>
        <button className="rating-button medium" onClick={() => pAssignKnowledge('3')}>3</button>
        <button className="rating-button high" onClick={() => pAssignKnowledge('4')}>4</button>
        <button className="rating-button highest" onClick={() => pAssignKnowledge('5')}>5</button>
      </div>
      <div className="actions-container">
        <button className="action-button" onClick={pBack}>Back</button>
        <button className="action-button green" onClick={pRevealAnswer}>Flip</button>
        <button className="action-button" onClick={pNext}>Next</button>
      </div>
    </div>
  )
}

export default LowerButtons;