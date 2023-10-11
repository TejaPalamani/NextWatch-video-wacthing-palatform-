import {formatDistanceToNow} from 'date-fns'

import {Link} from 'react-router-dom'

import ContextObject from '../../context/ContextObject'

import './index.css'

const GamePlayerList = props => {
  const {videosDetails} = props
  const {thumbnailUrl, title, viewCount, id} = videosDetails

  return (
    <Link to={`videos/${id}`} className="specialLink1">
      <li key={id}>
        <img
          src={thumbnailUrl}
          alt={title}
          style={{width: '100%', height: '60%'}}
        />
        <h4>{title}</h4>
        <h5>{`${viewCount} Watching`}</h5>
        <h5>Worldwide</h5>
      </li>
    </Link>
  )
}

export default GamePlayerList
