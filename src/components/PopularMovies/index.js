import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import PopularItem from '../PopularItem'

import './index.css'

const initialConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class PopularMovies extends Component {
  state = {
    status: initialConstants.initial,
    popularList: [],
  }

  componentDidMount() {
    this.getPopularApi()
  }

  getPopularApi = async () => {
    this.setState({status: initialConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        status: initialConstants.success,
        popularList: updatedData,
      })
    } else {
      this.setState({status: initialConstants.failure})
    }
  }

  renderSuccess = () => {
    const {popularList} = this.state

    return (
      <ul className="list-container">
        {popularList.map(eachItem => (
          <PopularItem key={eachItem.id} popularDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  tryagainPosterView = () => {
    this.getPopularApi()
  }

  renderFailure = () => (
    <div className="popular-failure-container">
      <div className="failure-sub-container">
        <img
          src="https://res.cloudinary.com/drgslpoho/image/upload/f_auto,q_auto/qbgzcahbb4anevncyvj3"
          alt="failure logo"
          className="failure-img"
        />
        <p className="failure-msg">Something went wrong, Please try again</p>
        <button
          className="try-again-btn"
          onClick={this.tryagainPosterView}
          type="button"
        >
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

  render() {
    return (
      <div className="popular-container">
        <Header />
        {this.getRenderResults()}
        <Footer />
      </div>
    )
  }
}

export default PopularMovies
