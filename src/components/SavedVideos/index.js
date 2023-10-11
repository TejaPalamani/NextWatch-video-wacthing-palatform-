import {AiFillFire} from 'react-icons/ai'

import Navbar from '../Navbar'
import Sider from '../Sider'
import Footer from '../Footer'
import SavedCard from '../SavedCard'
import ContextObject from '../../context/ContextObject'

import './index.css'

const SavedVideos = () => {
  const emptyFuntion = isDarkMode => {
    const bg = isDarkMode ? 'rgb(49, 49, 49)' : 'rgb(206, 205, 205)'
    const cl = isDarkMode ? 'rgb(206, 205, 205)' : 'rgb(49, 49, 49)'
    return (
      <div
        style={{
          backgroundColor: bg,
          color: cl,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
          alt="no saved videos"
          style={{maxWidth: '200px', display: 'flex', flexShrink: '2'}}
        />
        <h1>No saved videos found</h1>
        <p>You can save your videos while watching them </p>
      </div>
    )
  }

  const checkSuccessFunction = (savedVideosList, isDarkMode) => {
    const bg = isDarkMode ? 'rgb(49, 49, 49)' : 'rgb(206, 205, 205)'
    const cl = isDarkMode ? 'rgb(206, 205, 205)' : 'rgb(49, 49, 49)'

    console.log(savedVideosList)

    return (
      <div
        style={{
          backgroundColor: bg,
          color: cl,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: '25px',
        }}
      >
        <ul className="unlist">
          {savedVideosList.map(each => (
            <SavedCard key={each.id} cardDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  const checkingFunction = (savedVideosList, isDarkMode) => {
    const savedVideosLength = savedVideosList.length
    if (savedVideosLength === 0) {
      return emptyFuntion(isDarkMode)
    }
    return checkSuccessFunction(savedVideosList, isDarkMode)
  }

  const savedVideosCallingFunction = () => (
    <ContextObject.Consumer>
      {value => {
        const {isDarkMode, savedVideosList} = value
        const bg = isDarkMode ? 'rgb(49, 49, 49)' : 'rgb(206, 205, 205)'
        const cl = isDarkMode ? 'rgb(206, 205, 205)' : 'rgb(49, 49, 49)'

        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              width: '100vw',
              height: '100vh',
              overflowY: 'auto',
            }}
          >
            <div
              className="savedbanner"
              style={{backgroundColor: bg, color: cl}}
            >
              <div className="savedIcon" style={{backgroundColor: cl}}>
                <AiFillFire />
              </div>
              <h1>Saved Videos</h1>
            </div>
            <div>{checkingFunction(savedVideosList, isDarkMode)}</div>
          </div>
        )
      }}
    </ContextObject.Consumer>
  )

  return (
    <>
      <Navbar />
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Sider />
        {savedVideosCallingFunction()}
      </div>
      <Footer />
    </>
  )
}

export default SavedVideos
