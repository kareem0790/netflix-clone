import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import LoginContext from '../../context/LoginContext'

import './index.css'

const Account = props => (
  <LoginContext.Consumer>
    {value => {
      const {username} = value
      const onClickLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      return (
        <div className="account-container">
          <Header />
          <div className="account-holder-container">
            <h1 className="account-heading">Account</h1>
            <hr />
            <div className="membership-container">
              <p className="membership-heading">Member ship</p>
              <div className="profile-details-container">
                <p className="member-name">{username}@gmail.com</p>
                <p className="member-password">Password: *********</p>
              </div>
            </div>
            <hr />
            <div className="plan-details-container">
              <p className="plan-details">Plan details</p>
              <div className="premium-container">
                <p className="premium">Premium</p>
                <p className="ultra-hd">Ultra HD</p>
              </div>
            </div>
            <hr />
            <div className="logout-container">
              <button
                type="button"
                onClick={onClickLogout}
                className="logout-button"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="footer">
            <Footer />
          </div>
        </div>
      )
    }}
  </LoginContext.Consumer>
)
export default Account
