import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import ContextObject from '../../context/ContextObject'
import Navbar from '../Navbar'
import Sider from '../Sider'
import Footer from '../Footer'
import VideoPlayerList from '../VideoPlayerList'
import BannerSection from '../BannerSection'

import './index.css'

const functionStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  error: 'ERROR',
}

class Home extends Component {
  state = {
    videoData: [],
    searchResult: '',
    status: functionStatus.initial,
    banner: true,
  }

  componentDidMount() {
    this.apiCallFunction()
  }

  apiCallFunction = async () => {
    this.setState({status: functionStatus.loading})

    const {searchResult} = this.state

    const accessToken = Cookies.get('token')
    const VideosApi = `https://apis.ccbp.in/videos/all?search=${searchResult}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    const responce = await fetch(VideosApi, option)

    if (responce.ok) {
      const data = await responce.json()
      this.setState({status: functionStatus.success})
      this.onSuccessApiCall(data)
    } else {
      this.setState({status: functionStatus.error})
      this.failureApiCall()
    }
  }

  crossClickedFunction = () => {
    this.setState(prev => ({banner: !prev.banner}))
  }

  searchBar = () => {
    this.apiCallFunction()
  }

  retryClicked = () => {
    this.apiCallFunction()
  }

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

    this.setState({videoData: videosList})
  }

  emptyFunction = isDarkMode => {
    const {videoData, banner, searchResult} = this.state

    return (
      <div
        style={{
          width: '100%',
          backgroundColor: isDarkMode
            ? 'rgb(51, 51, 51)'
            : 'rgb(240, 241, 241)',
          color: isDarkMode ? 'white' : ' rgb(51, 51, 51)',

          padding: '15px',
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        {banner && (
          <BannerSection crossClickedFunction={this.crossClickedFunction} />
        )}
        <div className="input ">
          <input
            type="search"
            placeholder="Search"
            value={searchResult}
            onChange={event =>
              this.setState({searchResult: event.target.value})
            }
          />
          <BsSearch className="icon" onClick={this.searchBar} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
            style={{width: '80%'}}
          />
          <h1>No Videos of your search found try again</h1>
        </div>
      </div>
    )
  }

  onSuccessFunction = () => {
    const {videoData, banner, searchResult} = this.state

    return (
      <ContextObject.Consumer>
        {value => {
          const {isDarkMode} = value

          if (videoData.length === 0) {
            return this.emptyFunction(isDarkMode)
          }
          return (
            <div
              style={{
                width: '100%',
                backgroundColor: isDarkMode
                  ? 'rgb(51, 51, 51)'
                  : 'rgb(240, 241, 241)',
                color: isDarkMode ? 'white' : ' rgb(51, 51, 51)',
                padding: '15px',
                height: '100vh',
                overflowY: 'auto',
              }}
            >
              {banner && (
                <BannerSection
                  crossClickedFunction={this.crossClickedFunction}
                />
              )}
              <div>
                <div className="input ">
                  <input
                    type="search"
                    placeholder="Search"
                    onChange={event =>
                      this.setState({searchResult: event.target.value})
                    }
                    style={{
                      backgroundColor: isDarkMode ? 'rgb(51, 51, 51)' : 'white',
                      color: isDarkMode ? 'white' : ' rgb(51, 51, 51)',
                      paddingLeft: '10px',
                    }}
                    value={searchResult}
                  />
                  <BsSearch className="icon" onClick={this.searchBar} />
                </div>
                <div className="overflow">
                  <ul className="videosWrap">
                    {videoData.map(each => (
                      <VideoPlayerList videosDetails={each} key={each.id} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        }}
      </ContextObject.Consumer>
    )
  }

  onLoadingFunction = () => {
    const {banner, searchResult} = this.state

    return (
      <ContextObject.Consumer>
        {value => {
          const {isDarkMode} = value

          return (
            <div
              style={{
                width: '100%',
                backgroundColor: isDarkMode
                  ? 'rgb(51, 51, 51)'
                  : 'rgb(240, 241, 241)',
                color: isDarkMode ? 'white' : ' rgb(51, 51, 51)',
                padding: '15px',
                height: '100vh',
                overflowY: 'auto',
              }}
            >
              {banner && (
                <BannerSection
                  crossClickedFunction={this.crossClickedFunction}
                />
              )}
              <div>
                <div className="input ">
                  <input
                    type="search"
                    placeholder="Search"
                    style={{
                      backgroundColor: isDarkMode ? 'rgb(51, 51, 51)' : 'white',
                      color: isDarkMode ? 'white' : ' rgb(51, 51, 51)',
                      paddingLeft: '10px',
                    }}
                    onChange={event =>
                      this.setState({searchResult: event.target.value})
                    }
                    value={searchResult}
                  />
                  <BsSearch className="icon" onClick={this.searchBar} />
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '20px',
                  }}
                >
                  <Loader width={50} color="blue" type="TailSpin" />
                </div>
              </div>
            </div>
          )
        }}
      </ContextObject.Consumer>
    )
  }

  onErrorFunction = () => (
    <ContextObject.Consumer>
      {value => {
        const {isDarkMode} = value
        const errorImage = isDarkMode
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        const {banner, searchResult} = this.state

        return (
          <div
            style={{
              width: '100%',
              backgroundColor: isDarkMode
                ? 'rgb(51, 51, 51)'
                : 'rgb(240, 241, 241)',
              color: isDarkMode ? 'white' : ' rgb(51, 51, 51)',
              padding: '15px',
              height: '100vh',
              overflowY: 'auto',
            }}
          >
            {banner && (
              <BannerSection crossClickedFunction={this.crossClickedFunction} />
            )}
            <div>
              <div className="input ">
                <input
                  type="search"
                  placeholder="Search"
                  style={{
                    backgroundColor: isDarkMode ? 'rgb(51, 51, 51)' : 'white',
                    color: isDarkMode ? 'white' : ' rgb(51, 51, 51)',
                    paddingLeft: '10px',
                  }}
                  onChange={event =>
                    this.setState({searchResult: event.target.value})
                  }
                  value={searchResult}
                />
                <BsSearch className="icon" onClick={this.searchBar} />
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: '20px',
                }}
              >
                <img src={errorImage} alt="errorImage" style={{width: '80%'}} />
                <button type="button" onClick={this.retryClicked}>
                  Retry
                </button>
              </div>
            </div>
          </div>
        )
      }}
    </ContextObject.Consumer>
  )

  checkFunction = () => {
    const {status} = this.state

    switch (status) {
      case functionStatus.loading:
        return this.onLoadingFunction()

      case functionStatus.success:
        return this.onSuccessFunction()

      default:
        return this.onErrorFunction()
    }
  }

  render() {
    const {banner} = this.state

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

export default Home
