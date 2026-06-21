import {useState, useEffect, useCallback, useContext} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import Timer from '../Timer'
import Question from '../Question'
import AssessmentContext from '../../context/AssessmentContext'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Assessment = props => {
  const [response, setResponse] = useState({
    status: apiConstants.initial,
    data: null,
    errorMsg: null,
    total: null,
  })
  const [count, setCount] = useState(0)

  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const {setScore, setTimeRemaining} = useContext(AssessmentContext)

  const onAnsweredQuestions = (quesId, ansId) => {
    setAnsweredQuestions(prev => {
      const filteredAns = prev.filter(event => event.quesId !== quesId)
      return [...filteredAns, {quesId, ansId}]
    })
  }

  const calculateScore = () => {
    let currentScore = 0
    answeredQuestions.forEach(each => {
      const question = response.data.find(ques => ques.id === each.quesId)
      const correctAnswer = question.options.filter(
        opt => opt.isCorrect === true || opt.isCorrect === 'true',
      )
      if (each.ansId === correctAnswer[0].id) {
        currentScore += 1
      }
    })
    setScore(currentScore)
  }

  const submitAssessment = timeLeft => {
    const {history} = props
    let timeToComplete
    if (timeLeft === 0) {
      timeToComplete = 0
    } else {
      timeToComplete = 600 - timeLeft
    }

    calculateScore()
    console.log(timeToComplete)
    setTimeRemaining(timeToComplete)
    history.replace('/results')
  }

  const updatedData = data => {
    const questions = data.questions.map(each => {
      const {id, options_type: optionsType, question_text: questionText} = each
      let updatedOptions
      if (optionsType === 'DEFAULT') {
        updatedOptions = each.options.map(opt => ({
          id: opt.id,
          text: opt.text,
          isCorrect: opt.is_correct,
        }))
      } else if (optionsType === 'IMAGE') {
        updatedOptions = each.options.map(opt => ({
          id: opt.id,
          text: opt.text,
          isCorrect: opt.is_correct,
          imageUrl: opt.image_url,
        }))
      } else if (optionsType === 'SINGLE_SELECT') {
        updatedOptions = each.options.map(opt => ({
          id: opt.id,
          text: opt.text,
          isCorrect: opt.is_correct === 'true',
        }))
      }
      return {
        id,
        options: updatedOptions,
        questionText,
        optionsType,
      }
    })
    return questions
  }
  const getData = useCallback(async () => {
    setResponse({
      status: apiConstants.progress,
      data: null,
      errorMsg: null,
      total: null,
    })
    const url = 'https://apis.ccbp.in/assess/questions'
    const options = {
      method: 'GET',
    }
    try {
      const fetchedData = await fetch(url, options)
      const responseData = await fetchedData.json()
      // console.log(responseData)
      if (fetchedData.ok) {
        const data = updatedData(responseData)
        // console.log(data)
        setResponse(prev => ({
          ...prev,
          status: apiConstants.success,
          total: responseData.total,
          data,
        }))
      } else {
        setResponse(prev => ({
          ...prev,
          status: apiConstants.failure,
          errorMsg: responseData.error_msg,
        }))
      }
    } catch (e) {
      console.log('error')
    }
  }, [])

  useEffect(() => {
    getData()

    const handleBeforeUnload = e => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeUnloading', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeUnloading', handleBeforeUnload)
    }
  }, [getData])

  const onNextQuestions = () => {
    if (count < 9) {
      setCount(prevCount => prevCount + 1)
    }
  }

  const onSetQuestion = indx => {
    const selectedQuestion = response.data[indx]
    if (selectedQuestion.optionsType === 'SINGLE_SELECT') {
      const firstOption = selectedQuestion.options[0].id
      const alreadyAnswered = answeredQuestions.find(
        q => q.quesId === selectedQuestion.id,
      )
      if (!alreadyAnswered) {
        setAnsweredQuestions(prev => [
          ...prev,
          {quesId: selectedQuestion.id, ansId: firstOption},
        ])
        onAnsweredQuestions(selectedQuestion.id, firstOption)
      }
    }
    setCount(indx)
  }

  const renderSuccessView = () => {
    const question = response.data[count]
    return (
      <div className="assessment-container">
        <div className="question-container">
          <Question
            key={question.id}
            question={question}
            count={count}
            answeredQuestions={answeredQuestions}
            onAnsweredQuestions={onAnsweredQuestions}
            onNextQuestions={onNextQuestions}
            response={response}
          />
        </div>
        <div className="timer-container">
          <Timer
            response={response}
            answeredQuestions={answeredQuestions}
            count={count}
            onSetQuestion={onSetQuestion}
            submitAssessment={submitAssessment}
          />
        </div>
      </div>
    )
  }

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#263868" height={50} width={50} />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dtas174iv/image/upload/v1741007445/Group_7519_qh7owu.jpg"
        alt="failure view"
      />
      <h1 className=" error">Oops! Something went wrong</h1>
      <p className="error">We are having some trouble</p>
      <button className="retry-btn" type="button" onClick={getData}>
        Retry
      </button>
    </div>
  )

  const renderAssessment = () => {
    const {status} = response
    // console.log(response)

    switch (status) {
      case apiConstants.progress:
        return renderLoader()
      case apiConstants.success:
        return renderSuccessView()
      case apiConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }
  return (
    <div className="bg-container">
      <Navbar />
      {renderAssessment()}
    </div>
  )
}

export default Assessment
