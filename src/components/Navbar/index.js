import {Component} from 'react'

import Cookies from 'js-cookie'

import {withRouter} from 'react-router-dom'

import {BsSearch} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import {IoReorderThreeOutline} from 'react-icons/io5'

import {MdDarkMode, MdOutlineLightMode} from 'react-icons/md'

import ContextObject from '../../context/ContextObject'

import './index.css'

class Navbar extends Component {
  state = {searchNav: ''}

  logoutClicked = () => {
    const {history} = this.props

    Cookies.remove('token')

    history.replace('/login')
  }

  render() {
    const {searchNav} = this.state
    return (
      <ContextObject.Consumer>
        {value => {
          const {isDarkMode, toggeledMode, navbarShow, navbarToogle} = value
          const navlogo = isDarkMode
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const modeIcon = isDarkMode ? (
            <MdOutlineLightMode className="icon" />
          ) : (
            <MdDarkMode className="icon" />
          )

          const bgColor = isDarkMode ? 'white' : 'black'

          const modeChanged = () => {
            toggeledMode()
          }

          const navIconClicked = () => {
            navbarToogle()
          }

          const searchBar = () => {}

          return (
            <nav
              className="navbar"
              style={{
                backgroundColor: isDarkMode ? 'rgb(49, 49, 49)' : 'white',
                color: isDarkMode ? 'white' : 'black',
              }}
            >
              <div style={{display: 'flex', alignItem: 'center'}}>
                <button
                  type="button"
                  className="hide_small icon_dark "
                  style={{color: bgColor}}
                  onClick={navIconClicked}
                >
                  <IoReorderThreeOutline className="icon" />
                </button>
                <img
                  src={navlogo}
                  alt="Nav_logo"
                  style={{display: 'flex', flexShrink: '0'}}
                />
              </div>

              <div className="threebuttons">
                <button
                  className="icon_dark"
                  type="button"
                  style={{color: bgColor}}
                  onClick={modeChanged}
                >
                  {modeIcon}
                </button>
                <button type="button" className="icon_dark">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="icon"
                    style={{width: '30px'}}
                  />
                </button>

                <button
                  type="button"
                  className="button hide_small"
                  onClick={this.logoutClicked}
                >
                  Logout
                </button>
                <button
                  type="button"
                  className="icon_dark hide_large"
                  onClick={this.logoutClicked}
                >
                  <FiLogOut
                    className="icon"
                    style={{color: isDarkMode ? 'white' : 'black'}}
                  />
                </button>
              </div>
            </nav>
          )
        }}
      </ContextObject.Consumer>
    )
  }
}

export default withRouter(Navbar)
