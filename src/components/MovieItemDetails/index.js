import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import PopularItem from '../PopularItem'

import './index.css'

const initialConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieItemDetails extends Component {
  state = {
    status: initialConstants.initial,
    movieDetails: [],
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({status: initialConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: data.movie_details.genres.map(each => ({
          id: each.id,
          name: each.name,
        })),
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
        similarMovies: data.movie_details.similar_movies.map(each => ({
          id: each.id,
          title: each.title,
          backdropPath: each.backdrop_path,
          posterPath: each.poster_path,
        })),
        spokenLanguages: data.movie_details.spoken_languages.map(
          eachLanguage => ({
            id: eachLanguage.id,
            englishName: eachLanguage.english_name,
          }),
        ),
      }

      this.setState({
        movieDetails: updatedData,
        status: initialConstants.success,
      })
    } else {
      this.setState({status: initialConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  tryagainPosterView = () => {
    this.getMovieDetails()
  }

  renderFailure = () => (
    <div className="popular-failure-container">
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

  renderSuccess = () => {
    const {movieDetails} = this.state
    console.log(movieDetails)
    const {
      backdropPath,
      title,
      runtime,
      adult,
      releaseDate,
      overview,
      spokenLanguages,
      genres,
      voteCount,
      voteAverage,
      budget,
      similarMovies,
    } = movieDetails
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    const adultType = adult ? 'A' : 'U/A'
    const date = new Date(releaseDate)
    const getYear = date.getFullYear(date)

    return (
      <>
        <div
          style={{
            backgroundImage: `url(${backdropPath})`,
            backgroundSize: '100% 100%',
            width: '100%',
            height: '400px',
          }}
          className="movie-item-details-sub-container"
        >
          <div className="movie-item-poster-container">
            <h1 className="movie-item-title">{title}</h1>
            <div className="runtime-container">
              <p className="runtime">
                {hours}h {minutes}m
              </p>
              <p className="adult">{adultType}</p>
              <p className="release-year">{getYear}</p>
            </div>
            <p className="movie-item-details-overview">{overview}</p>
            <button type="button" className="play-button">
              Play
            </button>
          </div>
        </div>
        <div className="movie-content-details">
          <ul className="movie-item-details-list-container">
            <h1 className="genre">genres</h1>
            {genres.map(eachGenre => (
              <li
                className="movie-item-details-genre-list-item"
                key={eachGenre.id}
              >
                <p>{eachGenre.name}</p>
              </li>
            ))}
          </ul>
          <ul className="movie-item-details-list-container">
            <h1 className="genre">Audio Available</h1>
            {spokenLanguages.map(eachLan => (
              <li
                className="movie-item-details-genre-list-item"
                key={eachLan.id}
              >
                <p>{eachLan.englishName}</p>
              </li>
            ))}
          </ul>
          <div className="rating-container">
            <h1 className="rating-count-heading">Rating Count</h1>
            <p className="rating-count">{voteCount}</p>
            <h1 className="rating-average">Rating Average</h1>
            <p className="rating-average-count">{voteAverage}</p>
          </div>
          <div className="budget-container">
            <h1 className="budget-heading">Budget</h1>
            <p className="budget-count">{budget}</p>
            <h1 className="budget-heading">Release Date</h1>
            <p className="budget-count">{releaseDate.toLocaleString()}</p>
          </div>
        </div>
        <div className="more-like-this-container">
          <h1 className="more-like-this-heading">More like this</h1>
          <ul className="more-like-movies-list-container">
            {similarMovies.map(eachMovie => (
              <PopularItem key={eachMovie.id} popularDetails={eachMovie} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    return (
      <div className="movie-item-details-container">
        <Header />
        {this.getRenderResults()}
        <Footer />
      </div>
    )
  }
}
export default MovieItemDetails
