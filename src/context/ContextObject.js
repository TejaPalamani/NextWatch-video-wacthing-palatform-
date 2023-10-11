import React from 'react'

const ContextObject = React.createContext({
  isDarkMode: true,
  toggeledMode: () => {},
  navbarShow: true,
  navbarToogle: () => {},
  videoSaved: () => {},
  savedVideosList: [],
})

export default ContextObject
