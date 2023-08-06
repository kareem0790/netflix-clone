import {Link} from 'react-router-dom'

import './index.css'

const PopularItem = props => {
  const {popularDetails} = props
  const {backdropPath, title, id} = popularDetails

  return (
    <li className="list-item">
      <Link to={`/movies/${id}`} className="link">
        <img src={backdropPath} alt={title} className="popular-image" />
      </Link>
    </li>
  )
}

export default PopularItem
