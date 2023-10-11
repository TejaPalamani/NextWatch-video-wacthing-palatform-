import {Link} from 'react-router-dom'

import {PiCirclesThreePlusThin} from 'react-icons/pi'

import {SiYoutubegaming} from 'react-icons/si'

import {BsFire} from 'react-icons/bs'

import {AiOutlineHome} from 'react-icons/ai'

import ContextObject from '../../context/ContextObject'

import './index.css'

const Footer = () => {
  const t = 0

  return (
    <footer>
      <ul>
        <li>
          <i>
            <Link to="/" style={{color: 'white'}}>
              <AiOutlineHome />
            </Link>
          </i>
        </li>
        <li>
          <i>
            <Link to="/trending" style={{color: 'white'}}>
              <BsFire />
            </Link>
          </i>
        </li>
        <li>
          <i>
            <Link to="/gaming" style={{color: 'white'}}>
              <SiYoutubegaming />
            </Link>
          </i>
        </li>
        <li>
          <i>
            <Link to="/saved-videos" style={{color: 'white'}}>
              <PiCirclesThreePlusThin />
            </Link>
          </i>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
