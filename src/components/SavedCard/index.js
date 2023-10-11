import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import ContextObject from '../../context/ContextObject'
import './index.css'

const SavedCard = props => {
  const {cardDetails} = props
  const {
    id,
    description,
    title,
    videoUrl,
    thumbnailUrl,
    viewsCount,
    publishedAt,
    channel,
  } = cardDetails

  console.log(cardDetails)
  return (
    <ContextObject.Consumer>
      {value => {
        const {isDarkMode} = value
        const bg = isDarkMode ? 'rgb(49, 49, 49)' : 'red'
        const cl = isDarkMode ? 'rgb(206, 205, 205)' : 'rgb(49, 49, 49)'

        const difference = formatDistanceToNow(new Date(publishedAt))

        const f = difference.split(' ')
        const finalDiff = f.slice(1, 5)

        const fi = finalDiff.join(' ')

        return (
          <li className="list">
            <Link to={`/videos/${id}`} className="list1" style={{color: cl}}>
              <img src={thumbnailUrl} alt={title} className="imagecard" />
              <div className="r">
                <h2>{description}</h2>
                <h5>{channel.name}</h5>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <p className="brown">{`${viewsCount} Views `}</p>
                  <p className="brown">{` .${fi} ago`}</p>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </ContextObject.Consumer>
  )
}

export default SavedCard
