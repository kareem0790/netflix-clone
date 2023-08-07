import {withRouter, Link} from 'react-router-dom'

import './index.css'

const NotFound = props => {
  const onClickHome = () => {
    const {history} = props
    console.log(history)
    history.replace('/')
  }
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">Lost Your Way ?</h1>
      <p className="not-found-content">
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/" className="link">
        <button
          type="button"
          onClick={onClickHome}
          className="go-to-home-button"
        >
          Go to Home
        </button>
      </Link>
    </div>
  )
}
export default withRouter(NotFound)
