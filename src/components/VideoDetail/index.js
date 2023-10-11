import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'

import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineAppstoreAdd,
} from 'react-icons/ai'

import ContextObject from '../../context/ContextObject'

import Navbar from '../Navbar'
import Sider from '../Sider'
import Footer from '../Footer'

import './index.css'

const status = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  error: 'error',
}

class VideoDetail extends Component {
  state = {
    like: false,
    dislike: false,
    savedVideo: false,
    videoDetails: {},
    functionStatus: status.initial,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  retryButtonClicked = () => {
    this.getVideoDetails()
  }

  likeButtonClicked = () => {
    this.setState(prev =>
      prev.like ? {like: false} : {like: true, dislike: false},
    )
  }

  dislikeButtonClicked = () => {
    this.setState(prev =>
      prev.dislike
        ? {like: false, dislike: true}
        : {dislike: false, like: false},
    )
    this.setState(prev => ({dislike: !prev.dislike}))
  }

  getVideoDetails = async () => {
    this.setState({functionStatus: status.loading})
    const {match} = this.props
    const {id} = match.params
    const token = Cookies.get('token')
    const videoDetailApiCall = `https://apis.ccbp.in/videos/${id}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(videoDetailApiCall, option)

    if (response.ok) {
      const data = await response.json()
      this.videoDetailSuccess(data)
    } else {
      this.setState({functionStatus: status.error})
    }
  }

  videoDetailSuccess = data => {
    const each = data.video_details
    const filteredVideoData = {
      id: each.id,
      description: each.description,
      title: each.title,
      videoUrl: each.video_url,
      thumbnailUrl: each.thumbnail_url,
      viewsCount: each.view_count,
      publishedAt: each.published_at,
      channel: {
        name: each.channel.name,
        profileUrl: each.channel.profile_image_url,
        subscriptionCount: each.channel.subscriber_count,
      },
    }
    this.setState({
      videoDetails: filteredVideoData,
      functionStatus: status.success,
    })
  }

  loadingFunction = () => (
    <ContextObject.Consumer>
      {value => {
        const {isDarkMode} = value
        return (
          <div
            style={{
              backgroundColor: isDarkMode ? 'rgb(51, 51, 51)' : 'white',
              color: isDarkMode ? 'white' : 'rgb(51, 51, 51)',
              width: '100vw',
              height: '100vh',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Loader
              width="50"
              height="50"
              type="TailSpin"
              color={isDarkMode ? 'white' : 'black'}
            />
          </div>
        )
      }}
    </ContextObject.Consumer>
  )

  successFunction = () => {
    const {videoDetails, like, dislike, savedVideo} = this.state
    const {
      id,
      description,
      title,
      videoUrl,
      thumbnailUrl,
      viewsCount,
      publishedAt,
      channel,
    } = videoDetails
    const difference = formatDistanceToNow(new Date(publishedAt))

    const f = difference.split(' ')
    const finalDiff = f.slice(1, 5)

    const fi = finalDiff.join(' ')

    return (
      <ContextObject.Consumer>
        {value => {
          const {isDarkMode, videoSaved} = value

          const savedVideosClicked = () => {
            videoSaved(videoDetails)
            this.setState(prev => ({savedVideo: !prev.savedVideo}))
          }

          return (
            <div
              style={{
                backgroundColor: isDarkMode ? 'rgb(51, 51, 51)' : 'white',
                color: isDarkMode ? 'white' : 'rgb(51, 51, 51)',
                width: '100%',
                height: '100vh',
                overflowY: 'auto',
                padding: '20px',
                overflowX: 'unset',
              }}
            >
              <ReactPlayer url={videoUrl} width="100%" height="70%" />
              <h3>{title}</h3>
              <div className="bottom">
                <div className="views">
                  <h3>{`${viewsCount} Views   .   ${fi} ago`}</h3>
                </div>
                <div className="threeButtons">
                  <button
                    type="button"
                    className="threeButton"
                    style={{color: isDarkMode ? 'white' : 'black'}}
                    onClick={this.likeButtonClicked}
                  >
                    <AiOutlineLike style={{color: like && 'blue'}} />
                    <p style={{color: like && 'blue'}}>Like</p>
                  </button>
                  <button
                    type="button"
                    className="threeButton"
                    style={{color: isDarkMode ? 'white' : 'black'}}
                    onClick={this.dislikeButtonClicked}
                  >
                    <AiOutlineDislike style={{color: dislike && 'blue'}} />
                    <p style={{color: dislike && 'blue'}}>Dislike</p>
                  </button>
                  <button
                    type="button"
                    className="threeButton"
                    style={{color: isDarkMode ? 'white' : 'black'}}
                    onClick={savedVideosClicked}
                  >
                    <AiOutlineAppstoreAdd
                      style={{color: savedVideo && 'blue'}}
                    />
                    <p style={{color: savedVideo && 'blue'}}> Saved</p>
                  </button>
                </div>
              </div>
              <hr />
              <div className="lowerProfileCard">
                <img
                  src={channel.profileUrl}
                  alt={channel.name}
                  style={{width: '50px', height: '50px'}}
                />
                <div style={{marginLeft: '15px', marginBottom: '25px'}}>
                  <h3>{channel.name}</h3>
                  <p>{`${channel.subscriptionCount} Subscribers`}</p>
                  <div style={{marginTop: '20px', marginBottom: '10px'}}>
                    <p>{description}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </ContextObject.Consumer>
    )
  }

  errorFunction = () => (
    <ContextObject.Consumer>
      {value => {
        const {isDarkMode} = value
        const image = isDarkMode
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div
            style={{
              backgroundColor: isDarkMode ? 'rgb(51, 51, 51)' : 'white',
              color: isDarkMode ? 'white' : 'rgb(51, 51, 51)',
              width: '100vw',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
            }}
          >
            <img
              src={image}
              alt="errorImage"
              style={{width: '80%', marginBottom: '15px'}}
            />
            <h4>Oops something went wrong</h4>
            <p>
              We have some trouble to complete your request please try again{' '}
            </p>
            <button
              type="button"
              style={{
                width: '100px',
                height: '40px',
                borderRadius: '10px',
                borderWidth: '1px',
                backgroundColor: 'blueviolet',
                color: 'white',
                marginTop: '20px',
              }}
              onClick={this.retryButtonClicked}
            >
              Retry
            </button>
          </div>
        )
      }}
    </ContextObject.Consumer>
  )

  checkFunction = () => {
    const {functionStatus} = this.state

    switch (functionStatus) {
      case status.loading:
        return this.loadingFunction()
      case status.success:
        return this.successFunction()
      default:
        return this.errorFunction()
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <Sider />
          {this.checkFunction()}
        </div>
        <Footer />
      </>
    )
  }
}

export default VideoDetail
