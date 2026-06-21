import {useState} from 'react'

import './index.css'

const Question = ({
  question,
  count,
  onAnsweredQuestions,
  answeredQuestions,
  onNextQuestions,
  response,
}) => {
  const {optionsType, options, questionText, id} = question
  const answeredOptions = answeredQuestions.find(each => each.quesId === id)
  const [selectedOptions, setSelectedOptions] = useState(
    optionsType === 'SINGLE_SELECT' && answeredOptions
      ? answeredOptions.ansId
      : options[0].id,
  )
  const onClickOption = (q, a) => {
    setSelectedOptions(a)
    onAnsweredQuestions(q, a)
  }

  const filtered = answeredQuestions.filter(e => e.quesId === id)

  const onHandleNextQuestion = () => {
    const isAnswered = answeredQuestions.find(each => each.quesId === id)

    if (optionsType === 'SINGLE_SELECT' && !isAnswered) {
      onClickOption(id, selectedOptions)
    }
    onNextQuestions()
  }

  const renderOptions = () => {
    if (optionsType === 'DEFAULT') {
      return (
        <div className="options-container">
          <ul className="options">
            {options.map(each => (
              <li key={each.id}>
                <button
                  type="button"
                  onClick={() => onClickOption(id, each.id)}
                  className={`${
                    filtered.length > 0 && filtered[0].ansId === each.id
                      ? 'selected-options option'
                      : 'option'
                  } list-option`}
                >
                  {each.text}
                </button>
              </li>
            ))}
          </ul>
          {count !== response.total - 1 && (
            <button
              type="button"
              className="next-btn"
              onClick={onHandleNextQuestion}
            >
              Next Question
            </button>
          )}
        </div>
      )
    }
    if (optionsType === 'IMAGE') {
      return (
        <div className="options-container">
          <ul>
            {options.map(each => (
              <li key={each.id} className="option">
                <button
                  type="button"
                  onClick={() => onClickOption(id, each.id)}
                >
                  <img
                    src={each.imageUrl}
                    alt={each.text}
                    className="image-option"
                  />
                </button>
              </li>
            ))}
          </ul>
          {count !== response.total - 1 && (
            <button type="button" onClick={onHandleNextQuestion}>
              Next Question
            </button>
          )}
        </div>
      )
    }
    if (optionsType === 'SINGLE_SELECT') {
      return (
        <ul className="options-container">
          <div>
            <select
              className="select-option"
              value={selectedOptions}
              onChange={e => onAnsweredQuestions(id, e.target.value)}
            >
              {options.map(each => (
                <option key={each.id} value={each.id}>
                  {each.text}
                </option>
              ))}
            </select>
          </div>
          <div className="warning-container">
            <p>!</p>
            <p>First option is selected by default</p>
          </div>
          {count !== response.total - 1 && (
            <button type="button" onClick={onHandleNextQuestion}>
              Next Question
            </button>
          )}
        </ul>
      )
    }
    return null
  }

  return (
    <div className="question">
      <p>
        {count + 1}. {questionText}
      </p>
      <hr />
      {renderOptions()}
    </div>
  )
}
export default Question
