import {useContext} from 'react'

import Navbar from '../Navbar'

import AssessmentContext from '../../context/AssessmentContext'

import './index.css'

const Results = props => {
  const {score, timeRemaining} = useContext(AssessmentContext)

  const onClickReattempt = () => {
    const {history} = props
    history.push('./assessment')
  }

  // const timeString = date.toString().substring(11, 19)

  const formatTime = seconds => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
    const s = String(Math.floor(seconds % 60)).padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  const timeString = formatTime(timeRemaining)

  console.log(timeString)
  const renderResults = () => (
    <div className="result-bg-container">
      <div className="result-container">
        <img
          src="https://res.cloudinary.com/dtas174iv/image/upload/v1740469908/Asset_2_1_inveem.png"
          alt="submit"
          className={`${timeRemaining !== 0 ? 'result-image' : 'display-none'}`}
        />
        <img
          src="https://res.cloudinary.com/dtas174iv/image/upload/v1740470010/calender_1_1_mfphpw.png"
          alt="time up"
          className={`${timeRemaining === 0 ? 'result-image' : 'display-none'}`}
        />
        <h1
          className={`${
            timeRemaining !== 0 ? 'congrats-heading' : 'display-none'
          }`}
        >
          Congrats! You completed the assessment
        </h1>
        <h1
          className={`${
            timeRemaining === 0 ? 'congrats-heading' : 'display-none'
          }`}
        >
          Time is up!
        </h1>
        <p
          className={`${
            timeRemaining === 0 ? 'congrats-heading' : 'display-none'
          }`}
        >
          You did not complete the assessment within the time
        </p>
        <p>Time Taken:{timeString}</p>
        <p>Your Score:{score}</p>
        <button className="" type="button" onClick={() => onClickReattempt()}>
          Reattempt
        </button>
      </div>
    </div>
  )

  return (
    <div className="bg-result-container">
      <Navbar />
      {renderResults()}
    </div>
  )
}

export default Results
