import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrPassword: false,
    showErrUsername: false,
    showErrorMsg: false,
    errorMsg: '',
    showPassword: false,
  }

  onBlurPassword = () => {
    const {password} = this.state
    if (password === '') {
      return this.setState({showErrPassword: true})
    }
    return this.setState({showErrPassword: false})
  }

  onBlurUsername = () => {
    const {username} = this.state
    if (username === '') {
      return this.setState({showErrUsername: true})
    }
    return this.setState({showErrUsername: false})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = () => {
    const {showPassword} = this.state
    this.setState(prev => ({showPassword: !prev.showPassword}))
    if (showPassword === true) {
      console.log('true')
    } else {
      console.log('false')
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errMsg =>
    this.setState({showErrorMsg: true, errorMsg: errMsg})

  onSubmitForm = async event => {
    event.preventDefault()
    const {password, username} = this.state
    const userDetails = {password, username}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      showErrPassword,
      showErrUsername,
      showPassword,
      showErrorMsg,
      errorMsg,
    } = this.state
    return (
      <div className="login-bg-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://res.cloudinary.com/dtas174iv/image/upload/v1738650686/yrzim8iie10muchipgnm.jpg"
            alt="login website logo"
          />
          <div className="username-container">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              id="username"
              placeholder="username"
              type="text"
              className="input"
              onBlur={this.onBlurUsername}
              onChange={this.onChangeUsername}
            />
            {showErrUsername ? <p className="error">*Require Username</p> : ' '}
          </div>
          <div className="username-container">
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              id="password"
              placeholder="username"
              type={showPassword ? 'text' : 'password'}
              className="input"
              onBlur={this.onBlurPassword}
              onChange={this.onChangePassword}
            />
            {showErrPassword ? <p className="error">*Require Password</p> : ''}
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              id="checkbox"
              onChange={this.onChangeCheckbox}
            />
            <label htmlFor="checkbox">Show Password</label>
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {showErrorMsg ? <p className="error">{errorMsg}</p> : ''}
        </form>
      </div>
    )
  }
}

export default Login
