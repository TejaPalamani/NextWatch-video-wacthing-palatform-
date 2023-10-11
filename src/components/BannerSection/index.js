import {RxCross2} from 'react-icons/rx'

import './index.css'

const BannerSection = props => {
  const {crossClickedFunction} = props

  const crossClicked = () => {
    crossClickedFunction()
  }

  return (
    <div className="banner">
      <div style={{paddingLeft: '25px'}}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="logo"
          style={{maxWidth: '150px', flexShrink: '1'}}
        />
        <p>Buy NXT Watch Premium Prepaid plane with UPI</p>
      </div>
      <button
        type="button"
        style={{
          fontSize: '35px',
          alignSelf: 'flex-start',
          marginTop: '10px',
          outline: 'none',
          backgroundColor: 'transparent',
          borderStyle: 'none',
          cursor: 'pointer',
        }}
        onClick={crossClicked}
      >
        <RxCross2 style={{fontSize: '35px', marginTop: '10px'}} />
      </button>
    </div>
  )
}

export default BannerSection
