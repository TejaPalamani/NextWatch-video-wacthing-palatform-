import {Link} from 'react-router-dom'

import {PiCirclesThreePlusThin} from 'react-icons/pi'

import {SiYoutubegaming} from 'react-icons/si'

import {BsFire} from 'react-icons/bs'

import {AiOutlineHome} from 'react-icons/ai'

import ContextObject from '../../context/ContextObject'

import './index.css'

const Sider = () => {
  const t = 0
  return (
    <ContextObject.Consumer>
      {value => {
        const {isDarkMode, navbarShow} = value

        const showOrNot = navbarShow ? 'toggleButtonOff' : 'hideClasses'

        const c = isDarkMode ? 'white' : 'black'

        return (
          <aside
            style={{
              width: navbarShow ? '280px' : '80Px',
              backgroundColor: isDarkMode
                ? 'rgb(59, 59, 59)'
                : 'rgb(218, 217, 217)',
              color: isDarkMode ? 'white' : 'black',
            }}
          >
            <ul className={showOrNot}>
              <li>
                <i>
                  <Link to="/" style={{color: c}}>
                    <AiOutlineHome />
                  </Link>
                </i>
                <p>Home</p>
              </li>

              <li>
                <i>
                  <Link to="/trending" style={{color: c}}>
                    <BsFire />
                  </Link>
                </i>
                <p>Trending</p>
              </li>
              <li>
                <i>
                  <Link to="/gaming" style={{color: c}}>
                    <SiYoutubegaming />
                  </Link>
                </i>
                <p>Games</p>
              </li>
              <li>
                <i>
                  <Link to="/saved-videos" style={{color: c}}>
                    <PiCirclesThreePlusThin />
                  </Link>
                </i>
                <p>Saved Videos</p>
              </li>
            </ul>
            <div className={navbarShow ? 'contactUs' : 'hideClasses'}>
              <h1>Contact Us</h1>
              <div className="contactUsIcons">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                  alt="twitter logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
                  alt="linked in logo"
                />
              </div>
              <p>Enjoy! now see your channels and recommendation!</p>
            </div>

            <ul className={navbarShow ? 'hideClasses' : 'toggleButtonON'}>
              <li>
                <i>
                  <Link to="/" style={{color: c}}>
                    <AiOutlineHome />
                  </Link>
                </i>
              </li>
              <li>
                <i>
                  <Link to="/trending" style={{color: c}}>
                    <BsFire />
                  </Link>
                </i>
              </li>
              <li>
                <i>
                  <Link to="/gaming" style={{color: c}}>
                    <SiYoutubegaming />
                  </Link>
                </i>
              </li>
              <li>
                <i>
                  <Link to="/saved-videos" style={{color: c}}>
                    <PiCirclesThreePlusThin />
                  </Link>
                </i>
              </li>
            </ul>
          </aside>
        )
      }}
    </ContextObject.Consumer>
  )
}

export default Sider
