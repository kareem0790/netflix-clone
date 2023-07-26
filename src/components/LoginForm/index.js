import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showError: false,
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailureLogin = error => {
    this.setState({showError: true, errorMsg: error})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, errorMsg, showError, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-container">
        <img
          src="https://res.cloudinary.com/drgslpoho/image/upload/v1690393145/hewbfzdvblmx4dfgyjow.png"
          alt="website logo"
          className="logo-image"
        />

        <form onSubmit={this.onSubmitForm} className="login-container">
          <h1 className="login-heading">Login</h1>
          <div className="input-container">
            <label htmlFor="username" className="input-label">
              USERNAME
            </label>
            <input
              className="username"
              id="username"
              type="text"
              onChange={this.onChangeUsername}
              placeholder="Username"
              value={username}
            />
          </div>
          <div className="password-container">
            <label htmlFor="password" className="input-label">
              PASSWORD
            </label>
            <input
              type="password"
              className="username"
              id="password"
              onChange={this.onChangePassword}
              placeholder="Password"
              value={password}
            />
          </div>
          {showError && <p className="error-msg">{errorMsg}</p>}
          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginForm
