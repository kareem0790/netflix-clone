import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import LoginContext from '../../context/LoginContext'

import './index.css'

const LoginForm = props => (
  <LoginContext.Consumer>
    {value => {
      const {
        username,
        password,
        onChangeUsername,
        onChangePassword,
        onChangeShowError,
        showError,
        errorMsg,
      } = value

      const onSuccessLogin = jwtToken => {
        Cookies.set('jwt_token', jwtToken, {expires: 30})
        const {history} = props
        history.replace('/')
      }

      const onFailureLogin = error => {
        onChangeShowError(error)
      }

      const onSubmitForm = async event => {
        event.preventDefault()
        const userDetails = {username, password}
        const url = 'https://apis.ccbp.in/login'
        const options = {
          method: 'POST',
          body: JSON.stringify(userDetails),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok === true) {
          onSuccessLogin(data.jwt_token)
        } else {
          onFailureLogin(data.error_msg)
        }
      }
      const jwtToken = Cookies.get('jwt_token')
      if (jwtToken !== undefined) {
        return <Redirect to="/" />
      }
      const onChangeUsernameInput = event => {
        onChangeUsername(event)
      }

      const onChangePasswordInput = event => {
        onChangePassword(event)
      }

      return (
        <div className="app-container">
          <img
            src="https://res.cloudinary.com/drgslpoho/image/upload/v1690393145/hewbfzdvblmx4dfgyjow.png"
            alt="login website logo"
            className="logo-image"
          />

          <form onSubmit={onSubmitForm} className="login-container">
            <h1 className="login-heading">Login</h1>
            <div className="input-container">
              <label htmlFor="username" className="input-label">
                USERNAME
              </label>
              <input
                className="username"
                id="username"
                type="text"
                onChange={onChangeUsernameInput}
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
                onChange={onChangePasswordInput}
                placeholder="Password"
                value={password}
              />
            </div>
            {showError && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      )
    }}
  </LoginContext.Consumer>
)

export default LoginForm
