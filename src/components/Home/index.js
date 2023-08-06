import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Trending from '../Trending'
import Originals from '../Originals'
import Footer from '../Footer'

import './index.css'

const initialConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    status: initialConstants.initial,
    selectedOriginalMovie: [],
  }

  componentDidMount() {
    this.getRandomMovie()
  }

  getRandomMovie = async () => {
    this.setState({status: initialConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const lengthOfData = data.results.length
      const randomIndex = Math.floor(Math.random() * lengthOfData)
      const randomMovie = data.results[randomIndex]
      const updatedData = {
        id: randomMovie.id,
        title: randomMovie.title,
        overview: randomMovie.overview,
        posterPath: randomMovie.poster_path,
        backdropPath: randomMovie.backdrop_path,
      }
      this.setState({
        status: initialConstants.success,
        selectedOriginalMovie: updatedData,
      })
    } else {
      this.setState({status: initialConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {selectedOriginalMovie} = this.state
    const {title, backdropPath, overview} = selectedOriginalMovie

    return (
      <div
        className="poster-container"
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: '100% 100%',
          width: '100%',
          height: '100%',
        }}
      >
        <div className="poster-content">
          <h1 className="title">{title}</h1>
          <p className="overview">{overview}</p>
          <button type="button" className="play-btn">
            Play
          </button>
        </div>
      </div>
    )
  }

  tryagainPosterView = () => {
    this.getRandomMovie()
  }

  renderPosterFailureView = () => (
    <div className="loader">
      <div className="failure-container">
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

  renderLoading = () => (
    <div className="loader">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  renderPoster = () => {
    const {status} = this.state
    switch (status) {
      case initialConstants.success:
        return this.renderSuccessView()
      case initialConstants.failure:
        return this.renderPosterFailureView()
      case initialConstants.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-main-container">
        <Header />
        {this.renderPoster()}
        <div className="trending-container">
          <Trending />
        </div>
        <div className="original-container">
          <Originals />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
