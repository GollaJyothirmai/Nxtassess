import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

import Navbar from '../Navbar'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Navbar />
        <div className="home-inner-container">
          <ol className="instructions-container">
            <h1 className="heading" data-testid="instructionsHeading">
              Instructions
            </h1>
            <li className="instructions">
              Total Questions: <span className="text">10</span>
            </li>
            <li className="instructions">
              Types of Questions: <span className="text">MCQs</span>
            </li>
            <li className="instructions">
              Duration: <span className="text">10 Mins</span>
            </li>
            <li className="instructions">
              Marking Scheme: Every Correct response, get 1 mark
            </li>
            <li className="text instructions">
              All the progress will be lost, if you reload during the assessment
            </li>
            <Link to="/assessment">
              <button
                className="start-btn"
                type="button"
                onClick={this.onStartAssignment}
              >
                Start Assessment
              </button>
            </Link>
          </ol>
          <img
            src="https://res.cloudinary.com/dtas174iv/image/upload/v1738654274/hnkmlw8ehzlccu1di280.jpg"
            alt="assessment"
            className="home-image"
          />
        </div>
      </div>
    )
  }
}
export default Home
