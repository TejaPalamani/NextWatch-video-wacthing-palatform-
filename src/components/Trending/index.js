import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillFire} from 'react-icons/ai'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import Sider from '../Sider'
import Footer from '../Footer'
import SavedCard from '../SavedCard'
import VideoPlayerList from '../VideoPlayerList'

import ContextObject from '../../context/ContextObject'
import './index.css'

const statusObject = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  error: 'error',
}

class Trending extends Component {
  state = {trendingVideos: [], status: statusObject.initial}

  componentDidMount() {
    this.getTrendingList()
  }

  getTrendingList = async () => {
    this.setState({status: statusObject.loading})
    const trendingApi = 'https://apis.ccbp.in/videos/trending'

    const jwtToken = Cookies.get('token')

    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(trendingApi, option)

    if (response.ok) {
      const data = await response.json()
      this.onSuccessApiCall(data)
      this.setState({status: statusObject.success})
    } else {
      this.errorFunction()
      this.setState({status: statusObject.error})
    }
  }

  errorFunction = () => (
    <ContextObject.Consumer>
      {value => {
        const {isDarkMode} = value
        const bg = isDarkMode ? 'rgb(49, 49, 49)' : 'rgb(206, 205, 205)'
        const cl = isDarkMode ? 'rgb(206, 205, 205)' : 'rgb(49, 49, 49)'
        const imageUrl = isDarkMode
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',

              width: '100vw',
              minHeight: '100vh',
              maxHeight: '100%',
              backgroundColor: bg,
              padding: '20px',
            }}
          >
            <img
              src={imageUrl}
              alt="error"
              style={{maxWidth: '250px', maxHeight: '200px'}}
            />
            <h1>Oops something went wrong</h1>
            <p>
              We are having some problems to complete your request.
              <br />
              please try again
            </p>
            <button
              type="button"
              className="retryBUtton"
              onClick={() => this.getTrendingList()}
            >
              Retry
            </button>
          </div>
        )
      }}
    </ContextObject.Consumer>
  )

  loadingFunction = () => (
    <ContextObject.Consumer>
      {value => {
        const {isDarkMode} = value
        const bg = isDarkMode ? 'rgb(49, 49, 49)' : 'rgb(206, 205, 205)'
        const cl = isDarkMode ? 'rgb(206, 205, 205)' : 'rgb(49, 49, 49)'
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              width: '100vw',
              backgroundColor: bg,
            }}
          >
            <Loader width={50} color="#3283a8" type="TailSpin" />
          </div>
        )
      }}
    </ContextObject.Consumer>
  )

  onSuccessApiCall = data => {
    const videosList = data.videos.map(each => ({
      id: each.id,
      publishedAt: each.published_at,
      thumbnailUrl: each.thumbnail_url,
      title: each.title,
      viewCount: each.view_count,
      channel: {
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
      },
    }))

    this.setState({trendingVideos: videosList})
  }

  sucessFunction = () => (
    <ContextObject.Consumer>
      {value => {
        const {isDarkMode} = value
        const bg = isDarkMode ? 'rgb(49, 49, 49)' : 'rgb(206, 205, 205)'
        const cl = isDarkMode ? 'rgb(206, 205, 205)' : 'rgb(49, 49, 49)'
        const {trendingVideos} = this.state
        return (
          <div className="overflow" style={{backgroundColor: bg, color: cl}}>
            <div
              className="savedbanner"
              style={{backgroundColor: bg, color: cl}}
            >
              <div className="savedIcon" style={{backgroundColor: cl}}>
                <AiFillFire />
              </div>
              <h1>Trending Videos</h1>
            </div>
            <ul className="videosWrap">
              {trendingVideos.map(each => (
                <VideoPlayerList videosDetails={each} key={each.id} />
              ))}
            </ul>
          </div>
        )
      }}
    </ContextObject.Consumer>
  )

  checkFunction = () => {
    const {status} = this.state

    switch (status) {
      case statusObject.loading:
        return this.loadingFunction()
      case statusObject.success:
        return this.sucessFunction()
      default:
        return this.errorFunction()
    }
  }

  render() {
    const {trendingVideos} = this.state
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

export default Trending
