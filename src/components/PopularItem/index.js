import {Link} from 'react-router-dom'

import './index.css'

const PopularItem = props => {
  const {popularDetails} = props
  const {posterPath, title, id} = popularDetails

  return (
    <Link to={`/movies/${id}`} className="popular-link">
      <li className="list-item">
        <img src={posterPath} alt={title} className="popular-image" />
      </li>
    </Link>
  )
}

export default PopularItem
