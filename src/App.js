import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import ContextObject from './context/ContextObject'

import Login from './components/Login'

import Home from './components/Home'
import Trending from './components/Trending'
import SavedVideos from './components/SavedVideos'
import Gaming from './components/Gaming'
import VideoDetail from './components/VideoDetail'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {darkMode: false, navbarShow: false, savedVideoList: []}

  toggeledMode = () => {
    this.setState(prev => ({darkMode: !prev.darkMode}))
  }

  navbarToogle = () => {
    this.setState(prev => ({navbarShow: !prev.navbarShow}))
  }

  videoSaved = async videoDetails => {
    const {savedVideoList} = await this.state

    const isObjectAlreadyPresent = savedVideoList.some(
      eachObject => eachObject.id === videoDetails.id,
    )

    if (isObjectAlreadyPresent) {
      const filteredData = savedVideoList.filter(
        each => each.id !== videoDetails.id,
      )
      this.setState({savedVideoList: filteredData})
    } else {
      this.setState(prev => ({
        savedVideoList: [...prev.savedVideoList, videoDetails],
      }))
    }
  }

  render() {
    const {darkMode, navbarShow, savedVideoList} = this.state
    console.log(savedVideoList)
    return (
      <ContextObject.Provider
        value={{
          isDarkMode: darkMode,
          toggeledMode: this.toggeledMode,
          navbarShow,
          navbarToogle: this.navbarToogle,
          videoSaved: this.videoSaved,
          savedVideosList: savedVideoList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/videos/:id" component={VideoDetail} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ContextObject.Provider>
    )
  }
}

export default App
