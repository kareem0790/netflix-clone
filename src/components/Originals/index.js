import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import TrendingItem from '../TrendingItem'

import './index.css'

const initialConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Originals extends Component {
  state = {
    status: initialConstants.initial,
    originalsList: [],
  }

  componentDidMount() {
    this.getOriginalsApi()
  }

  getOriginalsApi = async () => {
    this.setState({status: initialConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
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
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        status: initialConstants.success,
        originalsList: updatedData,
      })
    } else {
      this.setState({status: initialConstants.failure})
    }
  }

  renderSuccess = () => {
    const {originalsList} = this.state
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    return (
      <Slider {...settings}>
        {originalsList.map(eachItem => (
          <TrendingItem key={eachItem.id} trendingDetails={eachItem} />
        ))}
      </Slider>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  tryagainPosterView = () => {
    this.getOriginalsApi()
  }

  renderFailure = () => (
    <div className="trending-failure-container">
      <div className="failure-sub-container">
        <img
          src="https://res.cloudinary.com/drgslpoho/image/upload/f_auto,q_auto/qbgzcahbb4anevncyvj3"
          alt="failure view"
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
      <div className="trending-container">
        <h1 className="trending-heading">Originals</h1>
        {this.getRenderResults()}
      </div>
    )
  }
}

export default Originals
