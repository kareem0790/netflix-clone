import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import PopularMovies from './components/PopularMovies'
import Search from './components/Search'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/" component={Home} />
    <Route exact path="/popular" component={PopularMovies} />
    <Route exact path="/search" component={Search} />
  </Switch>
)

export default App
