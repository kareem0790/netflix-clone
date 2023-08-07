import {Link} from 'react-router-dom'

import './index.css'

const TrendingItem = props => {
  const {trendingDetails} = props
  const {posterPath, title, id} = trendingDetails

  return (
    <Link to={`/movies/${id}`}>
      <img src={posterPath} alt={title} className="trending-img" />
    </Link>
  )
}

export default TrendingItem
