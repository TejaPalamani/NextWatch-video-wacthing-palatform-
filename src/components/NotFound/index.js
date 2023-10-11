import ContextObject from '../../context/ContextObject'
import Navbar from '../Navbar'
import './index.css'

const NotFound = () => (
  <ContextObject.Consumer>
    {value => {
      const {isDarkMode} = value
      const notFoundImage = isDarkMode
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      const bg = isDarkMode ? 'rgb(49, 49, 49)' : 'rgb(206, 205, 205)'
      const cl = isDarkMode ? 'rgb(206, 205, 205)' : 'rgb(49, 49, 49)'
      return (
        <>
          <Navbar />
          <div
            style={{
              height: '100vh',
              width: '100vw',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              backgroundColor: bg,
              color: cl,
            }}
          >
            <img src={notFoundImage} alt="notFound" className="notImage" />
            <h4>Page Not Found</h4>
            <p>we are sorry, the page you requested could not be found!</p>
          </div>
        </>
      )
    }}
  </ContextObject.Consumer>
)

export default NotFound
