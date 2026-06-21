import React from 'react'

const AssessmentContext = React.createContext({
  score: 0,
  setScore: () => {},
  timeRemaining: 0,
  setTimeRemaining: () => {},
})

export default AssessmentContext
