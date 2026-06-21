import {useState, useEffect} from 'react'

import './index.css'

const Timer = ({
  response,
  // count,
  answeredQuestions,
  onSetQuestion,
  submitAssessment,
}) => {
  const [timeLeft, setTimeLeft] = useState(600)

  console.log(timeLeft)
  useEffect(() => {
    if (timeLeft === 0) {
      return submitAssessment(timeLeft)
    }
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timerId)
  }, [timeLeft, submitAssessment])

  const onclickButton = index => {
    onSetQuestion(index)
  }
  /* const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const sec = Math.floor(seconds % 60)
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  } */

  const formatTime = seconds => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
    const s = String(Math.floor(seconds % 60)).padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  const renderTimer = () => (
    <div className="time-container">
      <p className="time-text">Time Left</p>
      <p className="timer">{formatTime(timeLeft)}</p>
    </div>
  )
  const {total} = response
  const renderQUestionView = () => (
    <>
      <div className="questions-count-container">
        <div className="asnwered-container">
          <p className="count-answered">{answeredQuestions.length}</p>
          <p className="">Answered Questions</p>
        </div>
        <div className="asnwered-container">
          <p className="count-unanswered">{total - answeredQuestions.length}</p>
          <p className="">Unanswered Questions</p>
        </div>
      </div>
      <hr />
      <div className="question-view-container">
        <h1 className="">Questions ({total})</h1>
        <ul className="questions-container">
          {response.data.map((e, index) => {
            const answered = answeredQuestions.find(
              each => each.quesId === e.id,
            )
            return (
              <li key={e.id}>
                <button
                  type="button"
                  className={answered ? 'ansQues' : 'ques'}
                  onClick={() => onclickButton(index)}
                >
                  {index + 1}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
  return (
    <div className="">
      {renderTimer()}
      {renderQUestionView()}
      <button type="button" onClick={() => submitAssessment(timeLeft)}>
        Submit Assessment
      </button>
    </div>
  )
}

export default Timer
