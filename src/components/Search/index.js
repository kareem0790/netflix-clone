import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import PopularItem from '../PopularItem'
import Header from '../Header'

import './index.css'

const initialConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Search extends Component {
  state = {
    searchInput: '',
    searchResults: [],
    status: initialConstants.initial,
  }

  componentDidMount() {
    this.getSearchApi()
  }

  getPath = () => {
    const {match} = this.props
    const {path} = match
    return path.slice(1)
  }

  getSearchApi = async () => {
    this.setState({status: initialConstants.loading})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        status: initialConstants.success,
        searchResults: updatedData,
      })
    } else {
      this.setState({status: initialConstants.failure})
    }
  }

  renderSuccess = () => {
    const {searchResults, searchInput} = this.state
    const lengthOfSearchResults = searchResults.length

    return (
      <>
        {lengthOfSearchResults === 0 ? (
          <div className="no-search-results-container">
            <div className="no-search-results-sub-container">
              <img
                src="https://res.cloudinary.com/drgslpoho/image/upload/v1691298934/nxxnwvcj2wo3lzo4mpm0.svg"
                alt="no movies"
                className="no-results-img"
              />
              <p className="no-results-content">
                Your search for {searchInput} did not find any matches.
              </p>
            </div>
          </div>
        ) : (
          <ul className="list-container">
            {searchResults.map(eachItem => (
              <PopularItem key={eachItem.id} popularDetails={eachItem} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderLoader = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  tryAgain = () => {
    this.getSearchApi()
  }

  renderFailure = () => (
    <div className="popular-failure-container">
      <div className="failure-sub-container">
        <img
          src="https://res.cloudinary.com/drgslpoho/image/upload/v1691298132/q8kkybswfzcqnmhu92kh.jpg"
          alt="failure view"
          className="failure-img"
        />
        <p className="failure-msg">Something went wrong, Please try again</p>
        <button className="try-again-btn" onClick={this.tryAgain} type="button">
          Try Again
        </button>
      </div>
    </div>
  )

  getRenderResults = () => {
    const {status} = this.state

    switch (status) {
      case initialConstants.loading:
        return this.renderLoader()
      case initialConstants.success:
        return this.renderSuccess()
      case initialConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    this.getSearchApi()
  }

  render() {
    const path = this.getPath()
    return (
      <div className="search-route-container">
        <Header
          search={path}
          onChangeSearchInput={this.onChangeSearchInput}
          onClickSearchIcon={this.onClickSearchIcon}
        />
        {this.getRenderResults()}
      </div>
    )
  }
}
export default Search
