import {useState} from 'react'

import {Route, Switch} from 'react-router-dom'

import AssessmentContext from './context/AssessmentContext'

import Login from './components/Login'

import Home from './components/Home'

import Assessment from './components/Assessment'

import ProtectedRoute from './components/ProtectedRoute'

import Results from './components/Results'

import NotFound from './components/NotFound'

import './App.css'

const App = () => {
  const [score, setScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)

  const scoreVal = val => {
    setScore(val)
  }

  const timeVal = time => {
    setTimeRemaining(time)
  }

  return (
    <AssessmentContext.Provider
      value={{
        score,
        setScore: scoreVal,
        timeRemaining,
        setTimeRemaining: timeVal,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/assessment" component={Assessment} />
        <ProtectedRoute exact path="/results" component={Results} />
        <Route component={NotFound} />
      </Switch>
    </AssessmentContext.Provider>
  )
}
export default App
