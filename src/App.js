import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import PopularMovies from './components/PopularMovies'
import Search from './components/Search'
import ProtectedRoute from './components/ProtectedRoute'
import Account from './components/Account'
import LoginContext from './context/LoginContext'
import MovieItemDetails from './components/MovieItemDetails'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    console.log('triggered')
    this.setState({username: event.target.value})
  }

  onChangeShowError = msg => {
    this.setState({showError: true, errorMsg: msg})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showError, errorMsg} = this.state

    return (
      <LoginContext.Provider
        value={{
          username,
          password,
          showError,
          errorMsg,
          onChangeShowError: this.onChangeShowError,
          onChangePassword: this.onChangePassword,
          onChangeUsername: this.onChangeUsername,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/popular" component={PopularMovies} />
          <ProtectedRoute exact path="/search" component={Search} />
          <ProtectedRoute exact path="/account" component={Account} />
          <ProtectedRoute
            exact
            path="/movies/:id"
            component={MovieItemDetails}
          />
          <Route component={NotFound} />
        </Switch>
      </LoginContext.Provider>
    )
  }
}

export default App
