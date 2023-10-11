import {formatDistanceToNow} from 'date-fns'

import {Link} from 'react-router-dom'

import ContextObject from '../../context/ContextObject'

import './index.css'

const VideoPlayerList = props => {
  const {videosDetails} = props
  const {
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
    channel,
    id,
  } = videosDetails
  const difference = formatDistanceToNow(new Date(publishedAt))

  const f = difference.split(' ')
  const finalDiff = f.slice(1, 5)

  const fi = finalDiff.join(' ')

  return (
    <Link to={`videos/${id}`} className="specialLink">
      <li key={id}>
        <img src={thumbnailUrl} alt={title} style={{width: '100%'}} />
        <div className="underSection">
          <img
            src={channel.profileImageUrl}
            alt={channel.name}
            className="profileLogo"
          />
          <div>
            <h4>{title}</h4>
            <h5 style={{marginTop: '9px', marginBottom: '9px'}}>
              {channel.name}
            </h5>
            <div className="underSection">
              <p
                style={{
                  marginLeft: '0px',
                  fontSize: '15px',
                  fontWeight: '20px',
                }}
              >
                {`${viewCount} Views`}
              </p>
              <p
                style={{
                  marginLeft: '12px',
                  fontSize: '15px',
                  fontWeight: '20px',
                }}
              >
                {`${fi} ago`}
              </p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default VideoPlayerList
